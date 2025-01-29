'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

import PhoneForm from '@/components/auth/phoneForm';
import { OtpForm } from '@/components/auth/otpForm';
import DetailsForm from '@/components/auth/detailsForm';
import SucessPopup from '@/components/auth/successPopup';

const Page = () => {
    const router = useRouter();
    const [step, setStep] = useState<'phone' | 'otp' | 'details'>('phone');
    const [phone, setPhone] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [details, setDetails] = useState<{ userName: string; email: string }>({ userName: '', email: '' });
    const [open, setOpen] = useState<boolean>(false);

    const handlePhoneSubmit = (phone: string) => {
        setPhone(phone);
        setStep('otp');
    }

    const handleOtpSubmit = (otp: string) => {
        setOtp(otp);
        setStep('details');
    }

    const handleDetailsSubmit = (detals: { userName: string; email: string }) => {
        setDetails(detals);
        console.log(phone, otp, details);
        setOpen(true);
        setTimeout(() => {
            router.push('/');
        }, 1500);
    }

    const renderForm = (step: string) => {
        switch (step) {
            case 'phone':
                return <PhoneForm handleSubmit={handlePhoneSubmit} />;
            case 'otp':
                return <OtpForm handleSubmit={handleOtpSubmit} />;
            case 'details':
                return <DetailsForm handleSubmit={handleDetailsSubmit} />;
            default:
                return <PhoneForm handleSubmit={handlePhoneSubmit} />;
        }
    }
    return (
        <div className='flex items-center  text-center min-h-screen px-6 py-20'>
            <div className='flex flex-col justify-center items-center md:max-w-[480px] mx-auto'>
                <div className='flex md:hidden gap-[9px] items-center mb-8'>
                    <Image src='/images/meetxo-logo.png' width={42} height={42} alt='logo' />
                    <h1 className='text-3xl md:text-[39px] leading-normal tracking-[0.144px] font-extrabold font-inter text-[#0A66C2]'>MeetXO</h1>
                </div>
                <h2 className='hidden md:block text-2xl md:text-[40px] font-bold leading-10'>Hi, Welcome to MeetXO!</h2>
                <p className='md:mt-6 text-2xl/[130%] font-bold '>
                    {step !== 'details' ? 'Login to your account' : 'Please Fill Below Details'}
                </p>
                {step === 'otp' && <p className='text-center text-muted-foreground my-7 font-plus-jakarta-sans text-sm font-medium leading-[22px] tracking-[0.07px]'>We have just sent you 4 digit code via your Mobile 9****989</p>}
                {renderForm(step)}
            </div>
            <SucessPopup open={open} setOpen={setOpen} />
        </div>
    )
}

export default Page