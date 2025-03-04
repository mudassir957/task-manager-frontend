import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  try {
    console.log('Fetching user profile...');

    // ✅ Forcefully fetch the latest token directly from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    console.log('Access Token from Cookies:', token);

    if (!token) {
      return NextResponse.json(
        { message: 'Authorization token missing' },
        { status: 401 }
      );
    }

    // Forward the request to your NestJS backend
    const response = await axios.get('http://localhost:3000/auth/profile', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the response from the NestJS backend to the frontend
    console.log('Response from backend:', response.data);
    return NextResponse.json(response.data);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
