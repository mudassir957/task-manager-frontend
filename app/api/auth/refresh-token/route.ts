import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const response = await axios.post(
      'http://localhost:3000/auth/refresh-token',
      {},
      { withCredentials: true }
    );

    console.log('🔄 Refresh token response:', response.data);
    console.log('🍪 Cookies received:', response.headers['set-cookie']);

    const res = NextResponse.json(response.data, { status: response.status });

    // Set cookies properly
    const setCookieHeader = response.headers['set-cookie'];

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
  } catch (error: any) {
    console.error(
      '❌ Token refresh failed:',
      error.response?.data || error.message
    );
    return NextResponse.json(
      { message: 'Token refresh failed' },
      { status: 401 }
    );
  }
}
