"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MobileNavigation from './mobileNavigation';
import BecomeExpertButton from './become-expert-button';
import LoginButton from './login-button';
import { Skeleton } from '@/components/ui/skeleton';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { getFallbackLetters, normalizeUsername } from '@/lib/utils';

// Define the User interface
interface User {
  name: string;
  profile_image?: string;
  // Add other properties if needed
}

export default function Navigation() {
  const [user, setUser] = useState<User | null>(null);

  async function handleGetUser() {
    const session = await getSession();
    if (session?.accessToken) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        if (response.data.success) {
          setUser(response.data.profile);
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    }
  }

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <>
      <div className='px-10 py-4 hidden md:flex justify-between items-center shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05)] sticky top-0 bg-background z-20'>
        <aside className='flex items-center gap-2'>
          <Link href={'/'}>
            <Image
              src='/images/meetxo-logo.png'
              width={1000}
              height={300}
              alt='logo'
              className='max-h-12 w-auto'
            />
          </Link>
        </aside>
        <aside className='flex shrink-0 items-center gap-7 relative'>
          <BecomeExpertButton />
          <LoginButton />

          {user?.name && (
            <Link href={`/profile/${normalizeUsername(user.name)}/?item=personal-information`}>
              <Avatar className="max-w-[48px]">
                <AvatarImage src={user.profile_image || ""} />
                <AvatarFallback className="text-white bg-primary">
                  {getFallbackLetters(user.name)}
                </AvatarFallback>
              </Avatar>
            </Link>
          )}
        </aside>
      </div>
      <MobileNavigation />
    </>
  );
}
