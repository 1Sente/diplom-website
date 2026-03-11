import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise });
    
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    // Payload CMS предоставляет встроенный метод login для коллекций с auth: true
    const result = await payload.login({
      collection: 'customers',
      data: {
        email: email.toLowerCase(),
        password,
      },
    });

    if (!result.token) {
      return NextResponse.json({ error: 'Неверный логин или пароль' }, { status: 401 });
    }

    // Возвращаем токен и данные пользователя.
    // На клиенте токен нужно будет сохранить (например, в httpOnly cookie или localStorage).
    // Так как Payload CMS обычно сама ставит cookie 'payload-token', мы просто возвращаем success.
    
    const response = NextResponse.json({ 
      success: true, 
      user: result.user 
    });

    // Дублируем токен в Set-Cookie для Next.js App Router (на случай если Payload cookie не дойдет)
    response.cookies.set('payload-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 неделя
    });

    return response;

  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Неверный email или пароль' }, { status: 401 });
  }
}
