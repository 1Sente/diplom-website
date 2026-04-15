import { NextResponse } from 'next/server';
import { YooCheckout } from '@a2seven/yoo-checkout';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // В реальном приложении здесь должна быть проверка сессии/токена пользователя
    const body = await req.json();
    const { customerId, amount } = body;

    if (!customerId || !amount) {
      return NextResponse.json({ error: 'Missing customerId or amount' }, { status: 400 });
    }

    const customer = await payload.findByID({
      collection: 'customers',
      id: customerId,
    });

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;

    if (!shopId || !secretKey) {
      console.error('YooKassa: YOOKASSA_SHOP_ID и YOOKASSA_SECRET_KEY не заданы в .env');
      return NextResponse.json({ error: 'Платёжный шлюз не настроен. Обратитесь к администратору.' }, { status: 500 });
    }

    const checkout = new YooCheckout({ shopId, secretKey });

    const idempotenceKey = `topup_${customerId}_${Date.now()}`;

    // YooKassa требует сумму в формате "500.00" (две десятичные)
    const amountValue = parseFloat(amount).toFixed(2);

    // Создаем платеж в YooKassa
    const payment = await checkout.createPayment({
      amount: {
        value: amountValue,
        currency: 'RUB'
      },
      confirmation: {
        type: 'redirect',
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/billing?status=success`
      },
      capture: true,
      description: `Пополнение баланса Личного Кабинета для ${customer.email || 'клиента'}`,
      metadata: {
        customerId: customerId,
        type: 'balance_topup'
      }
    }, idempotenceKey);

    return NextResponse.json({ 
      success: true, 
      confirmationUrl: payment.confirmation?.confirmation_url,
      paymentId: payment.id
    });

  } catch (error: any) {
    console.error('YooKassa Payment Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
