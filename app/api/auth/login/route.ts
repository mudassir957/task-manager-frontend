import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Forward the request to the NestJS backend
    const response = await axios.post(
      'http://localhost:3000/auth/login',
      data,
      {
        withCredentials: true,
      }
    );

    const setCookieHeader = response.headers['set-cookie'];

    const res = NextResponse.json(response.data, { status: response.status });

    if (setCookieHeader) {
      const cookies = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];
      cookies.forEach((cookie) => {
        const [cookieName, cookieValue] = cookie.split(';')[0].split('=');
        res.cookies.set(cookieName.trim(), cookieValue.trim());
      });
    }
    return res;
  } catch (err: any) {
    console.error('Login error:', err.response?.data || err.message);
    return NextResponse.json(
      { message: 'Token refresh failed' },
      { status: 401 }
    );
  }
}
