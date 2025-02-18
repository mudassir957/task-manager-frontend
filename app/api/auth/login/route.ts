// app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const data = await req.json(); // Extract the data from the request

    // Forward the request to your NestJS backend
    const response = await axios.post('http://localhost:3000/auth/login', data);

    // Return the response from the NestJS backend to the frontend
    return NextResponse.json(response.data);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      {
        message:
          err.response?.data?.message || 'An error occurred during login',
      },
      { status: 500 }
    );
  }
}
