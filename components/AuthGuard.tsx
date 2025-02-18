'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/lib/api';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            const user = await getProfile();
            if (!user) {
                router.push('/auth/login');
            } else {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    if (loading) return <p>Loading...</p>;

    return <>{children}</>;
}
