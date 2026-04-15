import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';

// Проверяет последний pending-платёж клиента в YooKassa и зачисляет баланс если оплачен.
// Вызывается с фронтенда после редиректа обратно с YooKassa (резервный путь когда вебхук недоступен).
export async function POST(req: Request) {
  try {
    const { customerId } = await req.json();

    if (!customerId) {
      return NextResponse.json({ error: 'customerId required' }, { status: 400 });
    }

    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;

    if (!shopId || !secretKey) {
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
    }

    const authHeader = 'Basic ' + Buffer.from(`${shopId}:${secretKey}`).toString('base64');

    // Запрашиваем последние платежи этого клиента из YooKassa
    const ykRes = await fetch(
      `https://api.yookassa.ru/v3/payments?metadata.customerId=${customerId}&status=succeeded&limit=10`,
      { headers: { Authorization: authHeader } }
    );

    if (!ykRes.ok) {
      return NextResponse.json({ error: 'YooKassa API error' }, { status: 500 });
    }

    const ykData = await ykRes.json();
    const payments: any[] = ykData.items ?? [];

    if (payments.length === 0) {
      return NextResponse.json({ credited: 0 });
    }

    const payload = await getPayload({ config: configPromise });

    let credited = 0;

    for (const payment of payments) {
      // Пропускаем уже обработанные
      const existing = await payload.find({
        collection: 'orders',
        where: { yookassaPaymentId: { equals: payment.id } },
        limit: 1,
      });
      if (existing.docs.length > 0) continue;

      const amount = parseFloat(payment.amount.value);

      // Обновляем баланс
      const customer = await payload.findByID({ collection: 'customers', id: customerId });
      if (!customer) continue;

      const newBalance = (customer.balance ?? 0) + amount;
      await payload.update({ collection: 'customers', id: customerId, data: { balance: newBalance } });

      // Создаём запись в истории
      await payload.create({
        collection: 'orders',
        data: {
          customer: customerId,
          amount,
          type: 'topup',
          status: 'paid',
          yookassaPaymentId: payment.id,
        },
      });

      credited += amount;
    }

    return NextResponse.json({ credited });
  } catch (error: any) {
    console.error('Verify payment error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
