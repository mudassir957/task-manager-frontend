// app/api/auth/signout/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1]; // Extract token from the Authorization header

    if (!token) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    // Forward the signout request to your NestJS backend with the token
    const response = await axios.post(
      'http://localhost:3000/auth/signout',
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the request headers
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: 'Failed to sign out' },
      { status: 500 }
    );
  }
}
