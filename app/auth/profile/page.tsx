'use client';

import { useEffect, useState } from 'react';
import { getProfile } from '@/lib/api';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function fetchUser() {
            const data = await getProfile();
            setUser(data);
        }
        fetchUser();
    }, []);

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-xl font-bold">Profile</h2>
            {user ? (
                <div className="border p-4 mt-4">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
