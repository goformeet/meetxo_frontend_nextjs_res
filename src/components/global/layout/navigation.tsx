import React from 'react'
import { ModeToggle } from '../toggle-mode'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Navigation() {
  return (
    <div className='px-10 py-4 flex justify-between items-center'>
      <aside className='flex items-center gap-2'>
        <Image src='/images/meetxo-logo.png' width={42} height={42} alt='logo' />
        <span className='text-3xl md:text-[39px] leading-normal tracking-[0.144px] font-extrabold font-inter text-primary'>MeetXO</span>
      </aside>
      <aside className='flex items-center gap-7'>
        <ModeToggle />
        <Button className="w-full py-2 px-4 h-[42px]">
          <Image width={25} height={24} src="/images/expert-button-icon.svg" alt="Google" />
          <Link href={'/'} className="font-inter text-base font-medium leading-[160%] text-white">Become a Expert</Link>
        </Button>
        <div className='flex justify-center items-center bg-[#E3E6EA] dark:bg-muted-foreground flex-shrink-0 p-1.5 rounded-full h-full relative'>
          <span className='text-white rounded-full bg-[#FF5A5F] w-5 h-5 text-center font-inter text-[10px] font-bold leading-[15px] flex items-center justify-center absolute border-2 border-white -right-[3px] -top-[3px]'>2</span>
          <Image src={'/images/notification-icon.svg'} alt='Notification Icon' width={24} height={24} className='h-full w-auto' />
        </div>
        <Avatar className='max-w-[48px]'>
          <AvatarImage src="" />
          <AvatarFallback className='bg-[#E3E6EA] dark:bg-muted-foreground'>CN</AvatarFallback>
        </Avatar>

      </aside>
    </div>
  )
}
