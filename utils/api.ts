import { Task } from '@/types/task';

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch('/api/tasks', { credentials: 'include' });

  // Debugging: Log response
  const contentType = res.headers.get('content-type');
  const responseText = await res.text();
  console.log('🔍 Raw response:', responseText);

  if (!res.ok) {
    console.error('❌ Failed to fetch tasks:', responseText);
    throw new Error('Failed to fetch tasks');
  }

  if (!contentType || !contentType.includes('application/json')) {
    console.error('❌ Non-JSON response:', responseText);
    throw new Error('API did not return JSON');
  }

  const jsonData = JSON.parse(responseText);
  console.log('✅ Fetched Tasks:', jsonData);
  return jsonData.data;
};

export const createTask = async (task: Partial<Task>) => {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    throw new Error('Failed to create task');
  }

  return res.json();
};

export const updateTask = async (id: number, task: Partial<Task>) => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    throw new Error('Failed to update task');
  }

  return res.json();
};

export const deleteTask = async (id: number) => {
  const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });

  if (!res.ok) {
    throw new Error('Failed to delete task');
  }
};
