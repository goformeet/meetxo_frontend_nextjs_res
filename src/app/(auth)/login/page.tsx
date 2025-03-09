'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { getSession, signIn } from 'next-auth/react';
import PhoneForm from '@/components/auth/phoneForm';
import { OtpForm } from '@/components/auth/otpForm';
import DetailsForm from '@/components/auth/detailsForm';
import SucessPopup from '@/components/auth/successPopup';
import Link from 'next/link';
import {sendOtp, setUpProfile, User, validateUsername} from '@/services/api';
import { collectAuthData } from '@/app/utils/collectAuthData';
import { AuthData } from '@/types/authTypes';
import axios from 'axios';
import { normalizeUsername } from "@/lib/utils";
import {toast} from "sonner";


const Page = () => {
    const router = useRouter();
    const [step, setStep] = useState<'phone' | 'otp' | 'details'>('phone');
    const [phone, setPhone] = useState<string>('');
    const [loading,setLoading]=useState(false)
    // const [otp, setOtp] = useState<string>('');
    // const [details, setDetails] = useState<{ userName: string; email: string }>({ userName: '', email: '' });
    const [open, setOpen] = useState<boolean>(false);

    const handlePhoneSubmit = async (phone: string) => {
      setPhone(phone);

      try {
        setLoading(true)
        const res = await sendOtp(phone);
        if (res.success) {
          setStep("otp");
        } else {
          alert(res.message);
        }
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      }
    };

    const handleOtpSubmit = async (otp: string) => {
      // setOtp(otp);

      try {
        setLoading(true)
        const collectData = await collectAuthData(phone, otp);
        const authData: AuthData = collectData;

        const result = await signIn("credentials", {
          otp: authData.otp,
          phone: authData.mobile_number,
          login_device_details: JSON.stringify(authData.login_device_details),
          redirect: false,
        });

        if (result?.ok) {
          const session = await getSession();
          if (session?.user?.is_new_user) {
            setStep("details");
          } else {
              const response = await User(session?.accessToken || '');
              if (response.success) {
                  router.push(`/profile/${normalizeUsername(response.profile.username || "user")}/?item=personal-information`);
              }
          }
        }
      } catch (error) {
          console.error(error);
          if (axios.isAxiosError(error)) {
            console.error("Axios error response:", error.response);
            if (error?.response?.data?.message)
              alert(error?.response?.data?.message);
          } else if (error instanceof Error) {
            console.error("General error:", error.message);
            alert("Something went wrong");
          }
      }finally{
        setLoading(false)
      }
    };

    const handleDetailsSubmit =async (detals: {
      name: string;
      email: string;
      username?: string;
    }) => {
      // setDetails(detals);
      try {
        setLoading(true)
        const session = await getSession();

        if (!session || !session.accessToken) {
          throw new Error("User session not found or accessToken missing");
        }
        if(detals.username){
            const response = await validateUsername({user_name: detals.username});
            if(response.success) {
                const res = await setUpProfile(detals, session.accessToken);
                if (res.success) {
                    if (res.success) {
                        router.push(`/profile/${normalizeUsername(res.profile.username || "user")}/?item=personal-information`);
                    }
                } else {
                    alert(res.message);
                }
            }else {
                toast.error(response.message);
            }

        }

        
      } catch (error) {
        console.error(error);
        
      }finally{
        setLoading(false)
      }
    };
    const maskPhoneNumber = (phone: string): string => {
      if (phone.length < 3) return phone; 

      return phone[0] + phone[1] + phone[2] + "****" + phone.slice(-3);
    };
    const renderForm = (step: string) => {
      switch (step) {
        case "phone":
          return (
            <PhoneForm loading={loading} handleSubmit={handlePhoneSubmit} />
          );
        case "otp":
          return <OtpForm loading={loading} handleSubmit={handleOtpSubmit} />;
        case "details":
          return <DetailsForm handleSubmit={handleDetailsSubmit} />;
        default:
          return <PhoneForm handleSubmit={handlePhoneSubmit} loading={loading} />;
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
              {maskPhoneNumber(phone ? phone : "")}
            </p>
          )}
          {renderForm(step)}
        </div>
        <SucessPopup
          open={open}
          setOpen={setOpen}
          message={"Successfully Logged in"}
        />
      </div>
    );
}

export default Page