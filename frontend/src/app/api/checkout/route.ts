import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planName, price } = body;

    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;

    if (!shopId || !secretKey) {
      console.error('YooKassa credentials are not set in environment variables.');
      return NextResponse.json({ error: 'Ошибка конфигурации сервера. Перезапустите сервер (npm run dev).' }, { status: 500 });
    }

    const idempotenceKey = crypto.randomUUID();
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // Авторизация Basic Auth (ShopId:SecretKey в Base64)
    const authString = Buffer.from(`${shopId}:${secretKey}`).toString('base64');

    const payload = {
        amount: {
            value: `${price}.00`,
            currency: 'RUB'
        },
        capture: true,
        confirmation: {
            type: 'embedded' // Запрашиваем токен для виджета (Умного платежа)
        },
        description: `Оплата тарифа хостинга: ${planName}`
    };

    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Idempotence-Key': idempotenceKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const payment = await response.json();

    if (!response.ok) {
      console.error('YooKassa API Error:', payment);
      return NextResponse.json({ error: 'Ошибка создания платежа' }, { status: response.status });
    }

    if (payment.confirmation && payment.confirmation.confirmation_token) {
        return NextResponse.json({ 
            confirmation_token: payment.confirmation.confirmation_token,
            url: `${origin}/payment-success?plan=${encodeURIComponent(planName)}` // Куда вернуть после оплаты в виджете
        });
    }

    return NextResponse.json({ error: 'Не удалось получить токен подтверждения платежа' }, { status: 500 });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
