'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function VerifyEmail() {
  const [isVerifying, setIsVerifying] = useState(true);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`http://localhost:3000/auth/verify-email?token=${token}`);
        toast.success(response.data.message);
      } catch (error: any) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Email verification failed');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h1>{isVerifying ? 'Verifying your email...' : 'Email Verified Successfully!'}</h1>
      <ToastContainer />
    </div>
  );
}
