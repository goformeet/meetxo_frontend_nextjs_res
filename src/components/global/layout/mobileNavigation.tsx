import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
// import { ModeToggle } from '../toggle-mode'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function MobileNavigation() {
    return (
        <div className='flex md:hidden justify-between items-center px-4 py-4'>
            <aside className='flex items-center gap-2'>
                <Image src='/images/meetxo-logo.png' width={1000} height={300} alt='logo' className='h-10 w-auto' />
            </aside>
            <aside className='flex items-center gap-5 relative'>
                {/* <ModeToggle /> */}
                <SearchIcon className='h-6 w-auto' />
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className='bg-[#E3E6EA] dark:bg-muted-foreground  text-xs'>CN</AvatarFallback>
                </Avatar>
            </aside>
        </div>
    )
}
