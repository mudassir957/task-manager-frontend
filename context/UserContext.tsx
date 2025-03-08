'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/axiosInstance';

interface UserProfile {
    id: string;
    email: string;
    name: string;
}

interface UserContextType {
    user: UserProfile | null;
    setUser: (user: UserProfile | null) => void;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/profile', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const logout = async () => {
        try {
            await api.post('/auth/signout', {}, { withCredentials: true });
            setUser(null);
            window.location.href = '/auth/login'; // Redirect to login page
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
