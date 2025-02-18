'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const formSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long').max(50),
});

type LoginFormValues = z.infer<typeof formSchema>;

const Login = () => {
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await axios.post('/api/auth/login', data);

            // Store the JWT token in localStorage (or sessionStorage for session-based login)
            localStorage.setItem('access_token', response.data.access_token);

            // Redirect to the dashboard or home page after successful login
            router.push('/dashboard');
        } catch (err: any) {
            console.error(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='block mb-1 font-medium'>Email</FormLabel>
                                    <FormControl>
                                        <input id="email" type="email" placeholder="Enter your email here." {...field} className="w-full px-4 py-2 border rounded-md" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password Field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='block mb-1 font-medium'>Password</FormLabel>
                                    <FormControl>
                                        <input id="password" type="password" placeholder="Enter your password here." {...field} className="w-full px-4 py-2 border rounded-md" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                </Form>
                <div className='mt-2'>
                    <p className="mt-4 text-center text-sm">
                        Don't have an account?
                        <Button variant='link' className='p-2'>
                            <Link href='/auth/signup'>Sign Up</Link>
                        </Button>
                    </p>
                    <p className="text-center text-sm mt-2">
                        By logging in, you accept the <Link className='text-blue-500' href="/policies">company policies</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
