import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, contact, serviceInterest, message } = body;

    if (!name || !contact) {
      return NextResponse.json({ error: 'Имя и контакт обязательны' }, { status: 400 });
    }

    const payload = await getPayload({ config: configPromise });

    await payload.create({
      collection: 'leads',
      data: {
        name,
        contact,
        serviceInterest: serviceInterest || '',
        message: message || '',
        status: 'new',
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Leads API error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
