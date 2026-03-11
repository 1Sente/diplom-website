import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // Получаем данные от YooKassa
    const body = await req.json();

    // Проверяем тип события. YooKassa отправляет payment.succeeded когда оплата прошла успешно
    if (body.event !== 'payment.succeeded') {
      return NextResponse.json({ status: 'ignored' }, { status: 200 });
    }

    const payment = body.object;
    
    // В metadata мы должны передавать customerId при создании платежа
    const customerId = payment.metadata?.customerId;

    if (!customerId) {
      console.error('YooKassa Webhook: Missing customerId in metadata', payment.id);
      return NextResponse.json({ error: 'Missing customerId' }, { status: 400 });
    }

    // Проверяем, не обрабатывали ли мы уже этот платеж
    const existingOrders = await payload.find({
      collection: 'orders',
      where: {
        yookassaPaymentId: { equals: payment.id },
      },
    });

    if (existingOrders.docs.length > 0) {
      console.log('YooKassa Webhook: Payment already processed', payment.id);
      return NextResponse.json({ status: 'already_processed' }, { status: 200 });
    }

    const amount = parseFloat(payment.amount.value);

    // 1. Находим клиента
    const customer = await payload.findByID({
      collection: 'customers',
      id: customerId,
    });

    if (!customer) {
      console.error('YooKassa Webhook: Customer not found', customerId);
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // 2. Пополняем баланс клиента
    const currentBalance = customer.balance || 0;
    const newBalance = currentBalance + amount;

    await payload.update({
      collection: 'customers',
      id: customerId,
      data: {
        balance: newBalance,
      },
    });

    // 3. Создаем запись о пополнении в истории заказов
    await payload.create({
      collection: 'orders',
      data: {
        customer: customerId,
        amount: amount,
        type: 'topup',
        status: 'paid',
        yookassaPaymentId: payment.id,
      },
    });

    console.log(`YooKassa Webhook: Successfully topped up balance for customer ${customerId} by ${amount} RUB`);
    return NextResponse.json({ status: 'success' }, { status: 200 });

  } catch (error: any) {
    console.error('YooKassa Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
