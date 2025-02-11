import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
         <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen font-plus-jakarta-sans relative">
             <div className="hidden bg-[url('/images/login-bg.png')] bg-cover bg-center md:flex items-end text-white order-2 md:order-1 min-h-screen">
                 <div className='flex flex-col items-start gap-2 justify-center border-t-[5px] border-primary p-5 md:p-10 bg-primary-foreground flex-grow'>
                     <div className='flex gap-[9px] items-center'>
                         <Image src='/images/meetxo-logo.png' width={1000} height={300} alt='logo' className='h-14 w-auto' />
                           {/* <h1 className='text-3xl md:text-[39px] leading-normal tracking-[0.195px] font-extrabold font-inter'>MeetXO</h1> */}
                     </div>
                  <p className='font-plus-jakarta-sans text-xl md:text-4xl font-medium leading-[48px] tracking-[-0.5px]'>Accelerate your success with expert mentorship.</p>
                 </div>
          </div>
          <div className='order-1 md:order-2 relative'>
              {children}
              <div className='absolute bottom-4 flex flex-col md:flex-row md:gap-2.5 items-center justify-center w-full'>
                  <p className='text-gray-500 font-plus-jakarta-sans text-base font-medium leading-[160%]'>© 2025 Meetxo . Alrights reserved.</p>
                  <div className='font-plus-jakarta-sans text-sm font-medium leading-[160%] flex gap-2.5'>
                      <Link className="" href={'/'}>Terms & Conditions</Link>
                      <Link className="" href={'/'}>Privacy Policy</Link>
                </div>
              </div>
          </div>
      </main>
  )
}
