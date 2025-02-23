'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useSessionCheck = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user?.is_new_user) {
        router.push('/details');
      } else {
        router.push('/home');
      }
    }
  }, [status, session, router]);

  return { session, status };
};