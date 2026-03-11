import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { proxmoxAPI } from '@/lib/proxmox';

// Генерация случайного пароля
function generatePassword(length = 16) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
}

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // В реальном приложении здесь должна быть проверка сессии/токена пользователя
    const body = await req.json();
    const { customerId, planId } = body;

    if (!customerId || !planId) {
      return NextResponse.json({ error: 'Missing customerId or planId' }, { status: 400 });
    }

    // 1. Получаем данные клиента и тарифа
    const customer = await payload.findByID({
      collection: 'customers',
      id: customerId,
    });

    const plan = await payload.findByID({
      collection: 'hosting-plans',
      id: planId,
    });

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    if (!plan || !plan.proxmoxTemplateId || typeof plan.price !== 'number') {
      return NextResponse.json({ error: 'Plan not found or invalid' }, { status: 400 });
    }

    // Проверка баланса
    const currentBalance = customer.balance || 0;
    if (currentBalance < plan.price) {
      return NextResponse.json({ 
        error: 'Insufficient balance', 
        required: plan.price, 
        current: currentBalance 
      }, { status: 402 });
    }

    // 2. Ищем свободный IP-адрес
    const freeIps = await payload.find({
      collection: 'ip-pool',
      where: {
        status: { equals: 'free' },
      },
      limit: 1,
    });

    if (freeIps.docs.length === 0) {
      return NextResponse.json({ error: 'No free IP addresses available' }, { status: 500 });
    }

    const assignedIp = freeIps.docs[0];
    const password = generatePassword();

    // Списываем средства с баланса
    await payload.update({
      collection: 'customers',
      id: customerId,
      data: {
        balance: currentBalance - plan.price,
      },
    });

    // Создаем запись об оплате (списание с баланса)
    await payload.create({
      collection: 'orders',
      data: {
        customer: customerId,
        amount: plan.price,
        type: 'purchase',
        status: 'paid',
        hostingPlan: planId,
        yookassaPaymentId: `internal_balance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Внутренний ID для списания
      }
    });

    // 3. Создаем запись о сервере в Payload CMS со статусом "creating"
    const newVmId = Math.floor(Math.random() * (9000 - 200) + 200); 
    
    // Считаем дату истечения (+30 дней)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const newInstance = await payload.create({
      collection: 'hosting-instances',
      data: {
        customer: customerId,
        plan: planId,
        proxmoxVmId: newVmId,
        ipAddress: assignedIp.id,
        rootPassword: password,
        status: 'creating',
        expiresAt: expiresAt.toISOString(),
        autoRenew: true,
      },
    });

    // 4. Резервируем IP адрес
    await payload.update({
      collection: 'ip-pool',
      id: assignedIp.id,
      data: {
        status: 'in_use',
        assignedTo: newInstance.id,
      },
    });

    // 5. Запускаем асинхронный процесс создания сервера в Proxmox
    createProxmoxVM(newInstance.id, plan.proxmoxTemplateId, newVmId, `VPS-${newInstance.id}`, assignedIp.ipAddress, password, payload)
      .catch(err => console.error('Failed to create Proxmox VM in background:', err));

    return NextResponse.json({ 
      success: true, 
      instanceId: newInstance.id,
      message: 'Server creation started, balance deducted' 
    });

  } catch (error: any) {
    console.error('Server Creation API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// Фоновая функция взаимодействия с Proxmox
async function createProxmoxVM(instanceId: string, templateId: number, vmId: number, vmName: string, ip: string, password: string, payload: any) {
  try {
    const gateway = process.env.VM_NETWORK_GATEWAY || '192.168.0.1';
    
    console.log(`[Proxmox] Starting clone of template ${templateId} to VM ${vmId}`);
    
    await proxmoxAPI.cloneVM(templateId, vmId, vmName);
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log(`[Proxmox] Configuring Cloud-Init for VM ${vmId}`);
    await proxmoxAPI.configureCloudInit(vmId, ip, gateway, password);

    console.log(`[Proxmox] Starting VM ${vmId}`);
    await proxmoxAPI.startVM(vmId);

    await payload.update({
      collection: 'hosting-instances',
      id: instanceId,
      data: { status: 'active' },
    });
    
    console.log(`[Proxmox] VM ${vmId} created and started successfully!`);

  } catch (error) {
    console.error(`[Proxmox] Error creating VM ${vmId}:`, error);
    
    await payload.update({
      collection: 'hosting-instances',
      id: instanceId,
      data: { status: 'error' },
    });
  }
}
