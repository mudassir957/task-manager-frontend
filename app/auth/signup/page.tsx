'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';

const formSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long').max(50),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long').max(50),
});

type SignupFormValues = z.infer<typeof formSchema>;

const Signup = () => {
    const router = useRouter();
    const form = useForm<SignupFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: '', email: '', password: '' },
    });

    const onSubmit = async (data: SignupFormValues) => {
        try {
            await axios.post('/api/auth/signup', data);
            router.push('/login');
        } catch (err: any) {
            console.error(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
                <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='block mb-1 font-medium'>Name</FormLabel>
                                    <FormControl>
                                        <input id="name" placeholder="Enter your name here." {...field} className="w-full px-4 py-2 border rounded-md" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                        <input id="password" type="password" placeholder="Enter you password here." {...field} className="w-full px-4 py-2 border rounded-md" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? 'Signing up...' : 'Sign Up'}
                        </Button>
                    </form>
                </Form>
                <div className='mt-2'>
                    <p className="mt-4 text-center text-sm">
                        Already have an account?
                        <Button variant='link' className='p-2'>
                            <Link href='/auth/login'>Login</Link>
                        </Button>
                    </p>
                    <p className="text-center text-sm mt-2">
                        I accept the <Link className='text-blue-500' href="/policies">company policies</Link> by signing up.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
