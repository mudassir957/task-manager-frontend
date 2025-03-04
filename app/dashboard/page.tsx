'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import api from '@/lib/axiosInstance';

interface UserProfile {
    id: string;
    email: string;
    name: string;
    // Add any additional fields your user object has
}

const Dashboard = () => {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);


    // Fetch the user profile on component mount
    useEffect(() => {
        const fetchProfile = async () => {

            await new Promise((resolve) => setTimeout(resolve, 100));

            // const token = getAccessTokenFromCookies()
            // console.log('Access Token from Cookies:', token);

            try {

                const response = await api.get('/auth/profile', {
                    withCredentials: true, // Send cookies automatically
                    // headers: {
                    //     Authorization: `Bearer ${token}`,
                    // },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                router.push('/auth/login'); // Redirect to login on error
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    // Function to extract access_token from cookies
    const getAccessTokenFromCookies = () => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; access_token=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
    };

    // Logout function
    const handleLogout = async () => {
        try {
            console.log('Attempting to logout...');

            const accessToken = getAccessTokenFromCookies();
            console.log('Access Token in Logout function:', accessToken);

            const response = await api.post(
                '/auth/signout', // Will be proxied if configured
                {},
                {
                    withCredentials: true, // Send cookies with request
                    headers: {
                        Authorization: `Bearer ${getAccessTokenFromCookies()}`,
                    },
                }
            );

            console.log('Logout response:', response.data);

            // Redirect after successful logout
            router.push('/auth/login');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error occurred during logout:');
                console.error('Response:', error.response?.data);
                console.error('Status:', error.response?.status);
                console.error('Headers:', error.response?.headers);
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
                {user ? (
                    <>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Username:</strong> {user.name}</p>
                        {/* Display more user details as needed */}
                    </>
                ) : (
                    <p>No user data available.</p>
                )}
                <Button onClick={handleLogout} className="mt-4 w-full bg-red-500 hover:bg-red-600">
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;
