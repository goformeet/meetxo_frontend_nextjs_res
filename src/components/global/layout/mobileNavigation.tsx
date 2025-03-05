import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LoginButton from "@/components/global/layout/login-button";
import { getFallbackLetters, normalizeUsername } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ModeToggle } from '../toggle-mode'

interface User {
    name: string;
    profile_image?: string;
    // Add other properties if needed
}
export default function MobileNavigation({user}:{user: User | null}) {
    return (
        <div className='flex md:hidden justify-between items-center px-4 py-4 sticky top-0 z-30 bg-background'>
            <aside className='flex items-center gap-2'>
                <Link href={'/'}>
                    <Image src='/images/meetxo-logo.png' width={1000} height={300} alt='logo' className='h-10 w-auto' />
                </Link>
            </aside>
            <aside className='flex items-center gap-5 relative'>
                {/* <ModeToggle /> */}
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
    )
}
