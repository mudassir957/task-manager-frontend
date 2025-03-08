import api from '@/lib/axiosInstance';
import { Task } from '@/types/task';

// Fetch tasks
export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const res = await api.get('/tasks');
    console.log('✅ Fetched Tasks:', res.data);
    return res.data.data;
  } catch (error) {
    console.error('❌ Failed to fetch tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
};

// Create a new task
export const createTask = async (task: Partial<Task>) => {
  try {
    const res = await api.post('/tasks', task);
    return res.data;
  } catch (error) {
    console.error('❌ Failed to create task:', error);
    throw new Error('Failed to create task');
  }
};

// Update task
export const updateTask = async (id: number, task: Partial<Task>) => {
  try {
    const res = await api.patch(`/tasks/${id}`, task);
    return res.data;
  } catch (error) {
    console.error('❌ Failed to update task:', error);
    throw new Error('Failed to update task');
  }
};

// Delete task
export const deleteTask = async (id: number) => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.error('❌ Failed to delete task:', error);
    throw new Error('Failed to delete task');
  }
};
