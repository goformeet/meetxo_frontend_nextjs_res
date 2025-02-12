'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button';
import DateAndSlotSelection from '@/components/booking/date-and-slotp-selection';

export default function Page() {


    return (
        <div className='pl-5 pr-[35px] max-w-[calc(100%-105px)] w-full relative lg:h-[calc(100svh-80px)] flex flex-col justify-between'>
            <div>
                <Link href={'/'} className='flex gap-1.5 items-center py-5'>
                    <Image src={'/images/back-icon.svg'} alt='Back Icon' width={22} height={22} />
                    <p className='text-[22px]/7 font-bold'>Booking Session </p>
                </Link>
                <div className='lg:max-h-[calc(100vh-270px)] overflow-y-auto no-scrollbar'>
                    <div className='my-5 flex flex-col lg:flex-row gap-10 '>
                        <div className='rounded-[16px] border border-[#E3E6EA] overflow-hidden lg:w-3/5'>
                            <div className='bg-[rgba(10,102,194,0.15)] py-7 px-10 w-full'>
                                <div className='flex gap-4'>
                                    <Avatar className='h-[54px] w-[54px]'>
                                        <AvatarImage src={'/images/avatar.svg'} className='w-full h-full object-cover object-center' />
                                        <AvatarFallback className='bg-[#E3E6EA] dark:bg-muted-foreground'>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h1 className='text-2xl/9 font-bold'>Pristia Kanisn</h1>
                                        <p className='text-base/6'>Peincipal Designer</p>
                                    </div>
                                </div>
                                <p className='mt-6 text-lg/7 font-semibold max-w-[551px]'>Lorem Ipsum Sit amet dollar amet sing donh</p>
                            </div>
                            <div className='flex border-b border-[#E3E8ED]'>
                                <div className='w-1/2 py-[22px] px-10 border-r-[0.5px] border-[#E3E8ED]'>
                                    <div className='w-fit py-2 px-3 flex justify-center items-center gap-1 rounded-[24px] border border-foreground'>
                                        <p className='text-[#727272] text-xs/4 font-medium line-through'>₹ 3,300</p>
                                        <p className='text-base/5 font-bold'>₹2,299</p>
                                    </div>
                                </div>
                                <div className='w-1/2 py-[22px] px-10'>
                                    <div className='w-fit py-2 px-3 flex justify-center items-center gap-3'>
                                        <Image src={'/images/calander-icon.svg'} alt='Calander Icon' width={24} height={24} />
                                        <p className='text-balance/7'>30 mins meeting</p>
                                    </div>
                                </div>
                            </div>
                            <p className='text-base/7 py-7 px-10'>Lorem ipsum dolor sit amet consectetur. At nunc sit dui auctor. Ornare in aliquet volutpat felis. Mollis dapibus sem morbi diam. Sollicitudin semper et cras faucibus massa lorem. A vitae gravida tempus arcu gravida euismod massa nunc.
                                Non non ut purus ut gravida nibh lectus sagittis. Nibh sagittis imperdiet orci neque neque viverra eu. Nulla gravida gravida suspendisse sagittis nascetur. Justo sagittis.</p>
                        </div>
                        <DateAndSlotSelection />
                    </div>
                </div>
            </div>
            <div className='py-[25px] px-[42px] flex flex-col lg:flex-row justify-between items-center gap-10 bg-background'>
                <div className='whitespace-nowrap w-full flex flex-col items-center lg:items-start'>
                    <p className='text-xl/[130%] font-medium'>Confirm Your booking</p>
                    <div className='flex gap-3.5 items-center mt-2 opacity-70'>
                        <div className='flex gap-2 items-center'>
                            <Image src={'/images/calander-icon-rounded.svg'} height={20} width={20} alt='Calander Icon' />
                            <p className='text-xl/[130%] text-[#252525]'>Jan 2, 2025</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Image src={'/images/clock-icon.svg'} height={20} width={20} alt='Calander Icon' />
                            <p className='text-xl/[130%] text-[#252525]'>8:30 AM</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center lg:justify-end gap-[18px] w-full'>
                    <Button variant={'outline'} className='border-[#6B7B8A] text-[#6B7B8A] w-full max-w-[202px] h-[58px]'>
                        <Link href={'/explore'}>Back to Experts</Link>
                    </Button>
                    <Button className='text-white w-full max-w-[202px] h-[58px]'>
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}
