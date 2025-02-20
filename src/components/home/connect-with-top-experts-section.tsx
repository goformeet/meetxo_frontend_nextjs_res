'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { cn } from '@/lib/utils';

export default function ConnectWithTopExpertsSection() {
    const [selected, setSelected] = useState<string>('Find an Expert');

    const handleSelect = (item: string) => {
        setSelected(item);
    }

    const items = [
        'Find an Expert',
        'Book a Video Call',
        'Virtual Consultation',
            "Offline Meetings",

    ];
    return (
        <section className="py-14 md:py-28 px-4 md:px-7 lg:px-10 pt-6 md:pt-[50px] pb-14 md:pb-[103px]">
            <h6 className="text-2xl md:text-4xl/[46px] font-semibold tracking-[-2%]">Connect with Top Experts for Personalised Advice</h6>
            <div className="flex gap-4 md:gap-8 flex-wrap items-center mt-6 md:mt-12">
                {items.map((item) => (
                    <Button
                        key={item}
                        variant={item === selected ? 'default' : 'outline'}
                        className={cn("text-xs md:text-sm lg:text-base/[26px] py-3 px-4 h-fit rounded-full border-foreground",
                            { 'text-white': item === selected }
                        )}
                        onClick={()=>handleSelect(item)}
                    >{item}</Button>
                ))}
            </div>
            <div className="flex flex-col md:flex-row gap-14 md:gap-[108px] items-center mt-14 md:mt-[104px]">
                <div className="max-w-[515px]">
                      {selected === "Find an Expert" ? (
            <>
              <h6 className="font-semibold text-[32px]/10 tracking-[-1%]">
                Discover your go-to guru!
              </h6>
              <p className="mt-4 text-[#7E8492] dark:text-[#BFC8D1]">
                Looking for expert advice? Whether it’s career growth, business
                strategies, or personal development, MeetXO connects you with
                top professionals worldwide. Browse through experts in various
                fields and find the perfect match for your needs.
              </p>
            </>
          ) : selected === "Book a Video Call" ? (
            <>
              <h6 className="font-semibold text-[32px]/10 tracking-[-1%]">
                {" "}
                Let&apos;s Chat!
              </h6>
              <p className="mt-4 text-[#7E8492] dark:text-[#BFC8D1]">
                Got questions? Get real-time answers from industry experts
                through a quick and easy video call. No long email threads, no
                confusion—just instant, valuable insights from the right person
                at the right time.
              </p>
            </>
          ) : selected === "Virtual Consultation" ? (
            <>
              <h6 className="font-semibold text-[32px]/10 tracking-[-1%]">
                Virtual Consultation
              </h6>
              <p className="mt-4 text-[#7E8492] dark:text-[#BFC8D1]">
                Skip the hassle of in-person meetings! Book a virtual
                consultation with top experts from around the world and get the
                advice you need—all from the comfort of your couch (or wherever
                you like to think best
              </p>
            </>
          ) : (
            <>
              <h6 className="font-semibold text-[32px]/10 tracking-[-1%]">
                Offline Meeting
              </h6>
              <p className="mt-4 text-[#7E8492] dark:text-[#BFC8D1]">
                MeetXO offers Offline Meetings, enabling users to connect in
                person for meaningful discussions, consultations, and
                networking. This feature is perfect for professionals, mentors,
                and businesses that prefer face-to-face interactions over
                virtual meetings.
              </p>
            </>
          )}
                </div>
                <Image src={'/images/connect-section.png'} alt="" width={584} height={366} />
            </div>
        </section>
    )
}
