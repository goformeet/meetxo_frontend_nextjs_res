'use client'
import EventBookingModal from '@/components/booking/event-booking-modal';
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useState } from 'react'

export default function Page() {
  const [open, setOpen] = useState(false);

  const formattedDate = "2025-02-15T00:00:00Z";
  return (
    <main className='px-4 md:px-7 lg:px-10 max-w-5xl mx-auto py-20'>
      <div className='flex gap-2.5 items-center mb-2 bg-primary-light rounded-md w-fit py-1 px-2'>
        <Image src={'/images/event-label.svg'} height={18} width={18} alt='Event Label' />
        <p className='text-sm font-semibold text-[#1D8FD1]'>Private Event</p>
      </div>
      <Image src={'/images/event-item.png'} alt={"event banner"} width={287} height={131} className="h-[130px] w-auto max-w-full object-cover rounded-[10px] mb-4" />
      <h1 className='text-xl sm:text-2xl md:text-5xl font-bold mb-3'>Masterclass for empowering with AI for 2025</h1>
      <div className="flex gap-3 items-center flex-shrink-0 mb-3">
        <div className="flex flex-shrink-0 flex-col justify-center gap-0.5 rounded-lg overflow-hidden border border-[#DEDEDF] bg-[#F6F6F6] text-muted-foreground font-bold text-sm">
          <p className="px-3 pt-1 text-xs">
            {" "}
            {new Date(formattedDate).toLocaleDateString("en-US", {
              month: "short",
            })}
          </p>
          <div className="pb-1 bg-white">
            <p className="text-center">
              {" "}
              {new Date(formattedDate).toLocaleDateString("en-US", {
                day: "2-digit",
              })}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-0.5 text-muted-foreground text-sm">
          <p className="font-bold">
            {" "}
            {new Date(formattedDate).toLocaleDateString("en-US", {
              weekday: "short",
            })}
            ,{" "}
            {new Date(formattedDate).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
            })}
          </p>
          <p>
            11:30 - 12:00PM (GMT +05:30)
          </p>
        </div>
      </div>
      <div className='flex items-center gap-2.5 mb-3'>
        <div className='border border-muted-foreground/70 w-fit p-2 rounded-lg'>
          <Image src={'/images/google-meet-icon.png'} alt='Google Meet' width={50} height={50} className='h-6 w-6' />
        </div>
        <p className='text-base font-semibold text-muted-foreground'>Google Meet</p>
      </div>
      <div className='flex items-center gap-2.5 mb-3'>
        <Avatar className='h-8 w-8'>
          <AvatarImage src='/images/avatar.svg' className='object-cover object-center' />
        </Avatar>
        <p className='text-base font-semibold text-muted-foreground'>Hosted By Sen Janson</p>
      </div>
      <div className='rounded-lg border border-muted-foreground/70 overflow-hidden max-w-md'>
        <p className='p-2 font-semibold bg-primary-light'>Registration</p>
        <div className='p-2'>
          <div className='flex items-center gap-2.5'>
            <div className='p-2 bg-muted rounded-lg'>
              <Image alt='Calander Icon' src={'/images/calander-icon-rounded.svg'} height={24} width={24} />
            </div>
            <div className="flex flex-col gap-0.5 text-muted-foreground text-xs">
              <p className="font-bold">
                {" "}
                {new Date(formattedDate).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
                ,{" "}
                {new Date(formattedDate).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                })}
              </p>
              <p>
                11:30 - 12:00PM (GMT +05:30)
              </p>
            </div>
          </div>
          <div className='h-[1px] w-full bg-muted-foreground/50 my-3'></div>
          <p className='text-base font-semibold mb-3'>Welcome! To join the event, please register below.</p>
          <Button onClick={()=>setOpen(true)} className='text-white w-full'>Register Now</Button>
        </div>
      </div>
      <div className='mt-10'>
        <p className='font-semibold mb-4'>About the event:</p>
        <p className="whitespace-pre-line">
          {`Join us for the official launch of MeetXO, a revolutionary platform redefining how experts and seekers connect globally.
This exclusive event will bring together industry leaders, domain experts, and innovators to celebrate the next evolution of expert-driven knowledge sharing.

What to Expect?

🌟 Keynote Speeches from visionary leaders
🎙 Panel Discussions on the future of expert collaboration
🤝 Networking Opportunities with global pioneers
🚀 Sneak Peek into MeetXO – How we are reshaping the expert economy.

Whether you’re an expert, entrepreneur, or knowledge seeker, this event is your gateway to unlocking new opportunities and collaborations.

📢 Secure your spot now and be part of this game-changing launch!
Apply Now`}
        </p>

      </div>
      <EventBookingModal open={open} setOpen={setOpen} />
    </main>
  )
}
