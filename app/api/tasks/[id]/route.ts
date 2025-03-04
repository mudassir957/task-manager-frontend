import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

// ✅ Update a task
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updatedTask = await req.json();
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Authorization token missing' },
        { status: 401 }
      );
    }

    const response = await axios.patch(
      `http://localhost:3000/tasks/${id}`,
      updatedTask,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return NextResponse.json(response.data);
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Failed to update task', error: err.message },
      { status: 500 }
    );
  }
}

// ✅ Delete a task
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Authorization token missing' },
        { status: 401 }
      );
    }

    await axios.delete(`http://localhost:3000/tasks/${id}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Failed to delete task', error: err.message },
      { status: 500 }
    );
  }
}
