'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Dashboard = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('No token found, please log in');
                }

                // Fetch user profile from backend
                const response = await axios.get('/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProfile(response.data);
            } catch (err: any) {
                setError('Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('access_token'); // Get token from localStorage

            if (!token) {
                throw new Error('No token found, please log in');
            }

            // Send signout request with token
            await axios.post('/api/auth/signout', null, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the headers
                },
            });

            localStorage.removeItem('access_token'); // Remove the token from localStorage
            router.push('auth/login'); // Redirect to the login page
        } catch (err: any) {
            setError('Logout failed');
            console.error(err);
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {profile && (
                <div>
                    <p><strong>Email:</strong> {profile.email}</p>
                    {/* You can display more profile information here */}
                </div>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
