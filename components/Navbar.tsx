'use client';

import { useUser } from '@/context/UserContext';

const Navbar = () => {
    const { user, logout } = useUser();

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <h1 className="text-lg font-bold">Dashboard</h1>
            {user && (
                <div className="flex items-center space-x-4">
                    <span>{user.name}</span>
                    <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
