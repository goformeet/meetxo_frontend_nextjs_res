'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

import PhoneForm from '@/components/auth/phoneForm';
import { OtpForm } from '@/components/auth/otpForm';
import DetailsForm from '@/components/auth/detailsForm';
import SucessPopup from '@/components/auth/successPopup';
import Link from 'next/link';
import { sendOtp, setUpProfile, verifyOtp } from '@/services/api';
import { collectAuthData } from '@/app/utils/collectAuthData';
import { AuthData } from '@/types/authTypes';


const Page = () => {
    const router = useRouter();
    const [step, setStep] = useState<'phone' | 'otp' | 'details'>('phone');
    const [phone, setPhone] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [details, setDetails] = useState<{ userName: string; email: string }>({ userName: '', email: '' });
    const [open, setOpen] = useState<boolean>(false);

    const handlePhoneSubmit = async (phone: string) => {
      setPhone(phone);

      try {
        const res = await sendOtp(phone);
        if (res.success) {
          setStep("otp");
        } else {
          alert(res.message);
        }
      } catch (error) {
        console.error(error);

        alert("Something went wrong");
      }
    };

    const handleOtpSubmit = async (otp: string) => {
      setOtp(otp);
     
      try {
        const collectData = await collectAuthData(phone, otp);
        const authData: AuthData = collectData;

        const response = await verifyOtp(authData);
        if (response.success) {
             localStorage.setItem("token", response.token);
          if (response.is_new_user) {
            setStep("details");
          } 
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error(error);
          alert("Something went wrong");
      }
    };

    const handleDetailsSubmit =async (detals: {
      userName: string;
      email: string;
    }) => {
      setDetails(detals);
      try {
        const res = await setUpProfile(detals);
        console.log(res);
        if(res.success){
            router.push("/")
        }else{
            alert(res.message)
        }
        
      } catch (error) {
        
      }
      console.log(phone, otp, details);
    };
    const maskPhoneNumber = (phone: string): string => {
      if (phone.length < 3) return phone; 

      return phone[0] + phone[1] + phone[2] + "****" + phone.slice(-3);
    };
    const renderForm = (step: string) => {
      switch (step) {
        case "phone":
          return <PhoneForm handleSubmit={handlePhoneSubmit} />;
        case "otp":
          return <OtpForm handleSubmit={handleOtpSubmit} />;
        case "details":
          return <DetailsForm handleSubmit={handleDetailsSubmit} />;
        default:
          return <PhoneForm handleSubmit={handlePhoneSubmit} />;
      }
    };
    return (
      <div className="flex items-center  text-center min-h-screen px-6 py-20">
        <div className="flex flex-col justify-center items-center md:max-w-[480px] mx-auto">
          <Link
            href={"/"}
            className="flex md:hidden gap-[9px] items-center mb-8"
          >
            <Image
              src="/images/meetxo-logo.png"
              width={1000}
              height={300}
              alt="logo"
              className="h-12 w-auto"
            />
            {/* <h1 className='text-3xl md:text-[39px] leading-normal tracking-[0.144px] font-extrabold font-inter text-[#0A66C2]'>MeetXO</h1> */}
          </Link>
          <h2 className="hidden md:block text-2xl md:text-[40px] font-bold leading-10">
            Hi, Welcome to MeetXO!
          </h2>
          <p className="md:mt-6 text-2xl/[130%] font-bold ">
            {step !== "details"
              ? "Login to your account"
              : "Please Fill Below Details"}
          </p>
          {step === "otp" && (
            <p className="text-center text-muted-foreground my-7 font-plus-jakarta-sans text-sm font-medium leading-[22px] tracking-[0.07px]">
              We have just sent you 4 digit code via your Mobile{" "}
              {maskPhoneNumber(phone?phone:"")}
            </p>
          )}
          {renderForm(step)}
        </div>
        <SucessPopup open={open} setOpen={setOpen} />
      </div>
    );
}

export default Page