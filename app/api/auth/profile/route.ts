// app/api/auth/profile/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { message: 'Authorization token missing' },
        { status: 401 }
      );
    }

    // Forward the request to your NestJS backend
    const response = await axios.get('http://localhost:3000/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the response from the NestJS backend to the frontend
    return NextResponse.json(response.data);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
