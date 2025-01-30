import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { ModeToggle } from '../toggle-mode'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

export default function MobileNavigation() {
    return (
        <div className='flex md:hidden justify-between items-center px-4 py-6'>
            <aside className='flex items-center gap-2'>
                <Image src='/images/meetxo-logo.png' width={42} height={42} alt='logo' className='h-8 w-auto' />
                <span className='text-2xl leading-normal tracking-[0.144px] font-extrabold font-inter text-primary'>MeetXO</span>
            </aside>
            <aside className='flex items-center gap-5'>
                <ModeToggle />
                <SearchIcon className='h-6 w-auto' />
                <Avatar className='!rounded-full bg-[#E3E6EA] dark:bg-muted-foreground h-7 w-7 flex justify-center items-center'>
                    <AvatarImage src="" />
                    <AvatarFallback className='bg-[#E3E6EA] dark:bg-muted-foreground  text-xs'>CN</AvatarFallback>
                </Avatar>
            </aside>
        </div>
    )
}
