import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LoginButton from "@/components/global/layout/login-button";
// import { ModeToggle } from '../toggle-mode'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function MobileNavigation() {
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
                {/* <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className='bg-[#E3E6EA] dark:bg-muted-foreground  text-xs'>CN</AvatarFallback>
                </Avatar> */}
            </aside>
        </div>
    )
}
