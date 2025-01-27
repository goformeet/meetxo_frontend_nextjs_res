import PhoneForm from '@/components/auth/PhoneForm'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='flex items-center  text-center min-h-screen px-6 py-20'>
            <div className='flex flex-col justify-center items-center md:max-w-[480px] mx-auto'>
                <div className='flex md:hidden gap-[9px] items-center mb-8'>
                    <Image src='/images/meetxo-logo.png' width={42} height={42} alt='logo' />
                    <h1 className='text-3xl md:text-[39px] leading-normal tracking-[0.144px] font-extrabold font-inter text-[#0A66C2]'>MeetXO</h1>
                </div>
                <h2 className='hidden md:block text-2xl md:text-[40px] font-bold leading-10'>Hi, Welcome to MeetXO!</h2>
                <p className='md:mt-6 text-2xl/[130%] font-bold '>Login to your account</p>
                <PhoneForm />
            </div>
        </div>
    )
}

export default page