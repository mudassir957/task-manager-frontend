'use client';

import { useState } from 'react';
import { createTask } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import {
    Form, FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/types/task';

// Define the schema
const formSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(100),
    description: z.string().min(3, 'Description must be at least 10 characters').max(100),
    completed: z.boolean(),
    priority: z.enum(['low', 'medium', 'high'])
});

type TaskFormValues = z.infer<typeof formSchema>;

const CreateTaskForm = () => {
    const router = useRouter();
    const form = useForm<TaskFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            completed: false,
            priority: 'medium' // Default priority
        }
    });

    // handle Submit
    const onSubmit = async (data: TaskFormValues) => {
        try {
            await createTask(data as Partial<Task>);
            router.push('/tasks');
        } catch (err: any) {
            console.error(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
            <h1 className="text-xl font-bold mb-4">Create Task</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    {/* Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Task title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Task description (optional)" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Completed Checkbox */}
                    <FormField
                        control={form.control}
                        name="completed"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel>Mark as completed</FormLabel>
                            </FormItem>
                        )}
                    />

                    {/* Priority Dropdown */}
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Creating...' : 'Create Task'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default CreateTaskForm;