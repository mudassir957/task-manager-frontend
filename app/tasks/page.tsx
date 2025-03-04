'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchTasks, deleteTask, updateTask } from '@/utils/api';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import TaskCard from '@/components/TaskCard';

export default function TaskListPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Fetch tasks on mount
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

    // Handle task deletion
    const handleDelete = async (id: number) => {
        try {
            await deleteTask(id);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('❌ Error deleting task:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Tasks</h1>
                <Button onClick={() => router.push('/tasks/create')}>Create Task</Button>
            </div>

            {/* Loading State */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks.map(task => (
                        <TaskCard key={task.id} task={task} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}
