// // context/AuthContext.tsx
// 'use client';

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import api from '@/lib/axiosInstance';

// interface AuthContextProps {
//     isAuthenticated: boolean;
//     login: (token: string, deviceId: string) => void;
//     logout: () => void;
//     accessToken: string | null;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [accessToken, setAccessToken] = useState<string | null>(null);

//     const login = (token: string, deviceId: string) => {
//         setAccessToken(token);
//         localStorage.setItem('device_id', deviceId); // Store device ID securely
//     };

//     const logout = () => {
//         setAccessToken(null);
//         localStorage.removeItem('device_id');
//     };

//     useEffect(() => {
//         const initializeAuth = async () => {
//             try {
//                 const deviceId = localStorage.getItem('device_id');
//                 if (deviceId) {
//                     const response = await api.post('/auth/refresh-token', { deviceId });
//                     setAccessToken(response.data.access_token);
//                 }
//             } catch (error) {
//                 console.error('Failed to refresh token on init:', error);
//             }
//         };

//         initializeAuth();
//     }, []);

//     return (
//         <AuthContext.Provider
//             value={{ isAuthenticated: !!accessToken, login, logout, accessToken }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = (): AuthContextProps => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };
