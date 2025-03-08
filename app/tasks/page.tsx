'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchTasks, deleteTask } from '@/utils/api';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import TaskCard from '@/components/TaskCard';
import DashboardLayout from '@/components/Layout';
import { Input } from '@/components/ui/input';

export default function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error('❌ Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('❌ Error deleting task:', error);
    }
  };

  // Search 
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchQuery.toLowerCase()) // Handle cases where description may be empty
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64"
        />
        <Button onClick={() => router.push('/tasks/create')}>Create Task</Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(searchQuery ? filteredTasks : tasks).map(task => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {!loading && searchQuery && filteredTasks.length === 0 && (
        <p className="text-gray-500">No tasks found.</p>
      )}


    </DashboardLayout>
  );
}