import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const data = await req.json(); // Extract data from the request

    // Forward the request to your NestJS backend
    const response = await axios.post(
      'http://localhost:3000/auth/signup',
      data
    );

    // Return the response from the NestJS backend to the frontend
    return NextResponse.json(response.data);
  } catch (err: any) {
    console.error(
      'Error in request to backend:',
      err.response?.data || err.message
    );
    return NextResponse.json(
      {
        message:
          err.response?.data?.message || 'An error occurred during signup',
        error: err.message, // Include the error message in the response
      },
      { status: 500 }
    );
  }
}
