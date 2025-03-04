import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

// ✅ Fetch all tasks
export async function GET() {
  try {
    console.log('Fetching tasks...');

    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    console.log('Access token in Task route', token);

    if (!token) {
      return NextResponse.json(
        { message: 'Authorization token missing' },
        { status: 401 }
      );
    }

    const response = await axios.get('http://localhost:3000/tasks', {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('Fetching all tasks');
    console.log('Tasks fetched successfully:', response.data);

    return NextResponse.json(response.data);
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Failed to fetch tasks', error: err.message },
      { status: 500 }
    );
  }
}

// ✅ Create a new task
export async function POST(req: Request) {
  try {
    const { title, description, status } = await req.json();
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Authorization token missing' },
        { status: 401 }
      );
    }

    const response = await axios.post(
      'http://localhost:3000/tasks',
      { title, description, status },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return NextResponse.json(response.data);
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Failed to create task', error: err.message },
      { status: 500 }
    );
  }
}
