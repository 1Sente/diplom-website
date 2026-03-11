import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise });
    
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Проверяем, существует ли уже пользователь
    const existingUsers = await payload.find({
      collection: 'customers',
      where: {
        email: { equals: email.toLowerCase() },
      },
    });

    if (existingUsers.docs.length > 0) {
      return NextResponse.json({ error: 'Пользователь с таким email уже существует' }, { status: 400 });
    }

    // Создаем пользователя в Payload CMS
    const customer = await payload.create({
      collection: 'customers',
      data: {
        name,
        email: email.toLowerCase(),
        password, // Payload автоматически захеширует пароль, так как коллекция имеет auth: true
        balance: 0,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Регистрация успешна',
      customerId: customer.id
    });

  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: error.message || 'Ошибка сервера при регистрации' }, { status: 500 });
  }
}
