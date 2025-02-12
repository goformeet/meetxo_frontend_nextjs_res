import React from 'react'
// import { ModeToggle } from '../toggle-mode'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import MobileNavigation from './mobileNavigation'

export default function Navigation() {
  return (
    <>
      <div className='px-10 py-4 hidden md:flex justify-between items-center shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05)]'>
        <aside className='flex items-center gap-2'>
          <Image src='/images/meetxo-logo.png' width={1000} height={300} alt='logo' className='max-h-12 w-auto' />
        </aside>
        <aside className='flex items-center gap-7 relative'>
          {/* <ModeToggle /> */}
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
      <MobileNavigation/>
    </>
  )
}
