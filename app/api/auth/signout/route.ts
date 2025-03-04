'use server';

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    console.log('Processing logout request...');

    // Extract access_token from cookies
    const cookieHeader = req.headers.get('cookie');
    const accessToken = cookieHeader
      ?.split(';')
      .find((c) => c.trim().startsWith('access_token='))
      ?.split('=')[1];

    console.log('Access Token from Cookies:', accessToken);

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Authorization token missing' },
        { status: 401 }
      );
    }

    // Forward the logout request to NestJS backend
    const response = await axios.post(
      'http://localhost:3000/auth/signout',
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Clear cookies after successful logout
    const res = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: response.status }
    );

    // res.cookies.set('access_token', '', { maxAge: -1 });
    // res.cookies.set('refresh_token', '', { maxAge: -1 });
    // res.cookies.set('device_id', '', { maxAge: -1 });

    return res;
  } catch (err: any) {
    console.error('Logout error:', err.response?.data || err.message);
    return NextResponse.json(
      { message: err.response?.data?.message || 'Logout failed' },
      { status: err.response?.status || 500 }
    );
  }
}

// Access Token in logout route: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImVtYWlsIjoic2hhaHphZG11ZGFzc2lyOTU3QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwianRpIjoiZGNjYzJkOGUtMzVkYi00YjdlLWJmMmMtYzA5N2Q0ZThkMzFkIiwiaWF0IjoxNzQwMzk4ODYxLCJleHAiOjE3NDA0MDI0NjF9.TdQtGXiT2n2i20RhuyDHeM2KaSMvkTGF79zwohV4JWs
