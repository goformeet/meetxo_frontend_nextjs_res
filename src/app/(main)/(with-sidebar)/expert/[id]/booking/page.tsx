'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Page() {

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string>('');

    const dates = [
        {
            date: '22/01/2025',
            slots: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM']
        },
        {
            date: '23/01/2025',
            slots: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM']
        },
        {
            date: '24/01/2025',
            slots: ['08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM']
        },
        {
            date: '25/01/2025',
            slots: ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM']
        },
        {
            date: '26/01/2025',
            slots: ['07:00 AM', '07:30 AM', '08:00 AM']
        },
        {
            date: '27/01/2025',
            slots: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM']
        },
        {
            date: '28/01/2025',
            slots: ['01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM']
        }
    ];

    // Function to convert "DD/MM/YYYY" to "YYYY-MM-DD" (ISO format)
    const convertDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`; // "YYYY-MM-DD"
    };

    const handleDateClick = (date: string) => {
        setSelectedDate(date);
        const selectedDateObject = dates.find(d => d.date === date);
        setSelectedSlots(selectedDateObject ? selectedDateObject.slots : []);
    };

    const handleSlotClick = (slot: string) => {
        setSelectedSlot(slot);
    }


    return (
        <div className='pl-5 pr-[35px] max-w-[calc(100%-105px)] w-full relative min-h-[100vh-91px] h-full'>
            <Link href={'/'} className='flex gap-1.5 items-center py-5'>
                <Image src={'/images/back-icon.svg'} alt='Back Icon' width={22} height={22} />
                <p className='text-[22px]/7 font-bold'>Booking Session </p>
            </Link>
            <div className='max-h-[calc(100vh-240px)] overflow-y-auto no-scrollbar'>
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
                    <div className='lg:w-2/5 rounded-[16px] border border-[#E3E6EA] p-[26px]'>
                        <p className='text-lg/[26px] font-semibold'>Available sessions</p>
                        <p className='text-[#6B7B8A] text-sm/[18px] mt-1'>Book 1:1 sessions from the options based on your needs</p>
                        <div className='relative my-6'>
                            <div className='flex gap-4 overflow-x-scroll no-scrollbar'>
                                {dates.map((item, index) => {
                                    const formattedDate = convertDate(item.date);
                                    const isSelected = selectedDate === item.date;

                                    return (
                                        <Button
                                            key={index}
                                            variant="link"
                                            onClick={() => handleDateClick(item.date)}
                                            className={cn(
                                                "rounded-[8px] border border-[#E3E6EA] pt-1.5 pb-[9px] px-4 flex flex-col items-center justify-center whitespace-nowrap h-fit hover:no-underline",
                                                { 'border-foreground border-[1.5px]': isSelected }
                                            )}
                                        >
                                            <p className="uppercase text-[#6B7B8A] text-center text-[8px] font-bold">
                                                {new Date(formattedDate).toLocaleDateString('en-US', { weekday: 'short' })}
                                            </p>
                                            <p className="mt-1 text-sm/[18px] font-bold mb-3">
                                                {new Date(formattedDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                                            </p>
                                            <p className="text-[#30D158] text-[9px]/4 font-bold">
                                                {item.slots.length} slots
                                            </p>
                                        </Button>
                                    );
                                })}
                            </div>
                            <div className="absolute -right-6 top-1/2 -translate-y-1/2">
                                <Image src={'/images/forward-primary-icon.svg'} alt='Forward Icon' width={15} height={15} />
                            </div>
                        </div>
                        <div className='flex pb-2 justify-between items-center border-b border-[#DEE2E6]'>
                            <p className='text-base/6'>Select Time Zone</p>
                            <Select defaultValue={'ist'}>
                                <SelectTrigger className='border-none shadow-none gap-1.5 w-fit focus:ring-0'>
                                    <SelectValue placeholder="Select a timezone" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>North America</SelectLabel>
                                        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                                        <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                                        <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                                        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                                        <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                                        <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Europe & Africa</SelectLabel>
                                        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                                        <SelectItem value="cet">Central European Time (CET)</SelectItem>
                                        <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                                        <SelectItem value="west">
                                            Western European Summer Time (WEST)
                                        </SelectItem>
                                        <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                                        <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Asia</SelectLabel>
                                        <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                                        <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                                        <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
                                        <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                                        <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                                        <SelectItem value="ist_indonesia">
                                            Indonesia Central Standard Time (WITA)
                                        </SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Australia & Pacific</SelectLabel>
                                        <SelectItem value="awst">
                                            Australian Western Standard Time (AWST)
                                        </SelectItem>
                                        <SelectItem value="acst">
                                            Australian Central Standard Time (ACST)
                                        </SelectItem>
                                        <SelectItem value="aest">
                                            Australian Eastern Standard Time (AEST)
                                        </SelectItem>
                                        <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
                                        <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>South America</SelectLabel>
                                        <SelectItem value="art">Argentina Time (ART)</SelectItem>
                                        <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                                        <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                                        <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        {
                            selectedDate && (
                                <div className='mt-[18px] grid grid-cols-2 md:grid-cols-3 gap-4'>
                                    {
                                        selectedSlots.map((slot, index) => (
                                            <Button
                                                key={index}
                                                onClick={() => handleSlotClick(slot)}
                                                variant="link" className={cn('py-4 px-9 inline-flex justify-center items-center rounded-[9px] border border-[#E3E6EA] h-fit hover:no-underline text-foreground', { 'border-primary text-primary': slot === selectedSlot })}>
                                                <p className='text-base/6 text-center font-bold'>{slot}</p>
                                            </Button>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='py-[25px] px-[42px] flex flex-col lg:flex-row justify-between items-center gap-10'>
                <div className='whitespace-nowrap w-full'>
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
