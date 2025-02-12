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
        'Virtual Consultation'
    ];
    return (
        <section className="py-28 px-4 md:px-7 lg:px-10 pt-[50px] pb-[103px]">
            <h6 className="text-4xl/[46px] font-semibold tracking-[-2%]">Connect with Top Experts for Personalised Advice</h6>
            <div className="flex gap-4 md:gap-8 flex-wrap items-center mt-12">
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
            <div className="flex flex-col md:flex-row gap-14 md:gap-[108px] items-center mt-[104px]">
                <div className="max-w-[515px]">
                    {
                        selected === 'Find an Expert' ? (
                            <>
                                <h6 className="font-semibold text-[32px]/10 tracking-[-1%]">Discover your go-to guru!</h6>
                                <p className="mt-4 text-[#7E8492] dark:text-[#BFC8D1]">
                                    Find an expert who’s perfect for your needs and unlock a world of knowledge.
                                </p>
                            </>
                        ) : selected === 'Book a Video Call' ? (
                                <>
                                    <h6 className="font-semibold text-[32px]/10 tracking-[-1%]"> Let&apos;s Chat!</h6>
                                    <p className="mt-4 text-[#7E8492] dark:text-[#BFC8D1]">
                                        Book a video call with your chosen expert and get the answers you&apos;ve been looking for—right from the comfort of your home!
                                    </p>
                                </>     
                            ) : (
                                    <>
                                        <h6 className="font-semibold text-[32px]/10 tracking-[-1%]">Virtual Consultation</h6>
                                        <p className="mt-4 text-[#7E8492] dark:text-[#BFC8D1]">
                                            Expert advice, anytime, anywhere!
                                            Get personalized guidance through a seamless virtual consultation. All you need is your device and curiosity!
                                        </p>
                                    </>
                        )
                    }
                </div>
                <Image src={'/images/connect-section.png'} alt="" width={584} height={366} />
            </div>
        </section>
    )
}
