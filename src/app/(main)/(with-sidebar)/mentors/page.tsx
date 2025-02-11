import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'

export default function Page() {

    return (
        <div className='pl-5 py-5 pr-[35px] max-w-[calc(100%-105px)]'>
            <h1 className='text-[22px]/[28px] font-bold'>Mentors</h1>
            <div className='mt-6 flex py-[1px] px-6 items-center rounded-[38px] border border-[#F1F2F4]'>
                <Image src={'/icons/search-primary.svg'} alt='Search Icon' width={18} height={18} />
                <Input type="text" placeholder="Search by name, company, role" className="border-none focus-visible:ring-0 h-fit py-4 shadow-none placeholder:text-muted-foreground" />
            </div>
            <div className='my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-x-5 md:gap-y-8'>
                {/* {professionals.map((prof) => (
                    <ExpertCard key={prof.id} prof={prof} />
                ))} */}
            </div>
        </div>
    )
}
