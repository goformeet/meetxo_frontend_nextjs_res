 'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button';
import DateAndSlotSelection from '@/components/booking/date-and-slotp-selection';
import BookingForm, { BookingFormRef } from '@/components/booking/booking-form';
import {  bookMeetingApi, getSingleService, getTiming, Hosts, sendOtp, setUpProfile } from '@/services/api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { convertToISOString, formatSlots, getNext30Days } from '@/app/utils/booking';

import Script from 'next/script';
import { handlePayment } from '@/app/utils/razorpay';
import { getSession, signIn } from 'next-auth/react';
import axios from 'axios';
import { AuthData } from '@/types/authTypes';
import { collectAuthData } from '@/app/utils/collectAuthData';
import LoginModal from '@/components/auth/login-modal';
type ServiceType = {
  _id: string;
  user_id: string;
  name: string;
  short_description: string;
  long_description: string;
  duration: number;
  online_pricing: number;
  offline_pricing: number;
  is_offline_available: boolean;
  keywords: string[];
  location: number[];
  is_active: boolean;
  currency: { code: string; symbol: string };
  created_at: string;
  updated_at: string;
  __v: number;
};

type Response = {
  email: string;
  name:string;
  phone_number:string
  razorpay_order_id: string;

};
export default function Page() {
 
  const formRef = useRef<BookingFormRef>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [allSlots, setAllSlots] = useState<{ stime: string; etime: string }[]>(
    []
  );
  const [loading,setLoading]=useState(false)
  const [user, setUser] = useState({ name: "", profile_image: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState<string>("");
  const [step, setStep] = useState<"phone" | "otp" | "details">("phone");
  // const [details, setDetails] = useState<{
  //   userName: string;
  //   email: string;
  // }>({ userName: "", email: "" });
  // const [sucessOpen, setSucessOpen] = useState<boolean>(false);
  const [response, setResponse] = useState<Response>({
    name: "",
    email: "",
    phone_number: "",
    razorpay_order_id: "",
  });
  
  const [service, setService] = useState<ServiceType>({
    _id: "",
    user_id: "",
    name: "",
    short_description: "",
    long_description: "",
    duration: 0,
    online_pricing: 0,
    offline_pricing: 0,
    is_offline_available: false,
    keywords: [],
    location: [0, 0],
    is_active: false,
    currency: {
      code: "",
      symbol: "",
    },
    created_at: "",
    updated_at: "",
    __v: 0,
  });
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const username = segments[0]; 
  const dates=getNext30Days()


  const handlePhoneSubmit = async (phone: string) => {
    setPhone(phone);

    try {
      setLoading(true);
      const res = await sendOtp(phone);
      if (res.success) {
        setStep("otp");
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error(error);

      alert("Something went wrong");
    }finally{
      setLoading(false);
    }
  };
   
   const handleOtpSubmit = async (otp: string) => {
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
           if (service?.online_pricing) {
             makePayment();
           } else {
             bookMeeting()
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
      setLoading(false);
     }
   };
  const handleDetailsSubmit = async (detals: {
         userName: string;
         email: string;
       }) => {
        //  setDetails(detals);
         try {
           const session = await getSession();

           if (!session || !session.accessToken) {
             throw new Error("User session not found or accessToken missing");
           }

           const res = await setUpProfile(detals, session.accessToken);
           if (res.success) {
             if (service?.online_pricing) {
              
              makePayment()
              console.log(service);
              
             } else {
              bookMeeting()
             }
           } else {
             alert(res.message);
           }
         } catch (error) {
           console.error(error);
         }
       };
const makePayment=async()=>{
  try {
    setIsProcessing(true)
     const dat = {
       email: response.email||"",
       phone_number: phone||"",
       name: response.name||"",
     };
      const s = {
        name: response.name || "",
        online_pricing: service?.online_pricing
          ? service?.online_pricing
          : 0,
      };
     const currency = service?.currency?.code
       ? service?.currency?.code
       : "INR";
    await handlePayment(
      dat,
      s,
      continueToBooking,
      setIsProcessing,
      currency
    );
  } catch (error) {
    console.error(error);
    
  }finally{
    setIsProcessing(false)
  }
}
  const handleDateClick = async (date: string) => {
    setSelectedDate(date);
    // const selectedDateObject = dates.find(d => d.date === date);
    //  const session = await getSession();
    
    //    if (!session || !session.accessToken) {
    //      throw new Error("User session not found or accessToken missing");
    //    }
    const fetchSlot = await getTiming(id, date);

    setAllSlots(formatSlots(fetchSlot));

    setSelectedSlots(formatSlots(fetchSlot).map((slot) => slot.stime));
    // setSelectedSlots(selectedDateObject ? selectedDateObject.slots : []);
  };

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleFormSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    recive_details?: boolean;
  }) => {
    try {
      setIsProcessing(true)
      const session = await getSession();

      setResponse({
        email: data.email,
        phone_number: data.phone,
        name: data.name,
        razorpay_order_id: "",
      });

      if (!session || !session.accessToken) {
        setOpen(true);
      } else {
        if (service.online_pricing) {
          //  await handlePayment(dat, service, continueToBooking, setIsProcessing,"INR");
          await makePayment();
        } else {
          bookMeeting();
        }
      }
    } catch (error) {
      console.error(error);
    }finally{
      setIsProcessing(false)
    }
  };
  const getService = async () => {
    try {
      const res = await getSingleService(id);

      if (res.success) {
        setService(res.service);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getUser = async () => {
    try {

      const dat = await Hosts({ search: username });

      setUser(dat?.hosts?.hosts[0]);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeClick=()=>{
    setSelectedDate("")
    setSelectedSlot("")
  }
  const continueToBooking = async (
    data: { email: string; name: string; phone_number: string },
    response: { razorpay_order_id: string }
  ) => {
    setResponse({
      email:data.email,
      name:data.name,
      phone_number:data.phone_number,
      razorpay_order_id:response.razorpay_order_id


    })
    bookMeeting()
    // try {
    //    const session = await getSession();
      
    //      if (!session || !session.accessToken) {
    //        throw new Error("User session not found or accessToken missing");
    //      }
    //   const mtTime =
    //     selectedDate && selectedSlot
    //       ? convertToISOString(selectedDate, selectedSlot)
    //       : "";
    //   const postData = {
    //     host_id: service.user_id,
    //     meeting_time: mtTime,
    //     meeting_type: "Online",
    //     meeting_description: service.name,
    //     service_id: service._id,
    //     razorpay_payment_id: response.razorpay_order_id,
    //     email: data.email,
    //     phone_number: data.phone_number,
    //   };
    //   const res = await bookMeetingApi(postData, session.accessToken);
    //   if (res.success) {
    //     alert(res.message);
    //     router.push(`/${username}`);
    //   }
    // } catch (error) {
    //   console.error(error);
   
    //   alert("Something went wrong. Please try again.");
    // }
  };

  const bookMeeting = async () => {
    try {
      setIsProcessing(true);
      const session = await getSession();

      if (!session || !session.accessToken) {
        throw new Error("User session not found or accessToken missing");
      }
      const mtTime =
        selectedDate && selectedSlot
          ? convertToISOString(selectedDate, selectedSlot)
          : "";
      const postData = {
        host_id: service.user_id,
        meeting_time: mtTime,
        meeting_type: "Online",
        meeting_description: service.name,
        service_id: service._id,
        razorpay_payment_id: response.razorpay_order_id,
        email: response.email,
        phone_number: response.phone_number,
      };
      const res = await bookMeetingApi(postData, session.accessToken);
      if (res.success) {
        alert(res.message);
        router.push(`/${username}`);
      }
    } catch (error) {
      console.error(error);

      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  useEffect(() => {
    getService();
    getUser();
  }, []);

  return (
    <div className="px-4 md:px-7 lg:px-10 w-full relative flex flex-col justify-between">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div>
        <Link href={`/${username}`} className="flex gap-1.5 items-center py-5">
          <Image
            src={"/images/back-icon.svg"}
            alt="Back Icon"
            width={22}
            height={22}
          />
          <p className="text-lg md:text-[22px]/7 font-bold">Booking Session </p>
        </Link>
        <div>
          <div className="my-5 flex flex-col lg:flex-row gap-10 ">
            <div className="rounded-[16px] border border-[#E3E6EA] overflow-hidden lg:w-3/5">
              <div className="bg-[rgba(10,102,194,0.15)] py-4 md:py-7 px-5 md:px-10 w-full">
                <div className="flex gap-4">
                  <Avatar className="h-12 md:h-[54px] w-12 md:w-[54px]">
                    <AvatarImage
                      src={
                        user.profile_image
                          ? user.profile_image
                          : "/images/avatar.svg"
                      }
                      className="w-full h-full object-cover object-center"
                    />
                    <AvatarFallback className="bg-[#E3E6EA] dark:bg-muted-foreground">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-xl md:text-2xl/9 font-bold">{user.name}</h1>
                    <p className="text-sm md:text-base/6">{username}</p>
                  </div>
                </div>
                <p className="mt-4 md:mt-6 text-base md:text-lg/7 font-semibold max-w-[551px]">
                  {service.name}
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center border-b border-[#E3E8ED]">
                <div className="md:w-1/2 py-2 md:py-[22px] px-5 md:px-10 md:border-r-[0.5px] border-[#E3E8ED]">
                  <div className="w-fit py-2 px-3 flex justify-center items-center gap-1 rounded-[24px] border border-foreground">
                    {/* <p className="text-[#727272] text-xs/4 font-medium line-through">
                      $ {(service.online_pricing * 1.2).toFixed(2)}
                    </p> */}
                    <p className="text-base/5 font-bold">
                      {service?.currency?.symbol?service?.currency?.symbol:"$"}{service.online_pricing.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 py-2 md:py-[22px] px-5 md:px-10">
                  <div className="w-fit py-2 px-3 flex justify-center items-center gap-3">
                    <Image
                      src={"/images/calander-icon.svg"}
                      alt="Calander Icon"
                      width={24}
                      height={24}
                    />
                    <p className="text-balance/7">
                      {service.duration} mins meeting
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm md:text-base/7 py-2.5 md:py-7 px-5 md:px-10">
                {service.long_description}
              </p>
            </div>
            {!selectedDate || !selectedSlot ? (
              <DateAndSlotSelection
                dates={dates}
                handleDateClick={handleDateClick}
                handleSlotClick={handleSlotClick}
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                selectedSlots={selectedSlots}
              />
            ) : (
              <>
              <BookingForm
                ref={formRef}
                handleFormSubmit={handleFormSubmit}
                selectedSlot={selectedSlot}
                selectedDate={selectedDate}
                allSlots={allSlots}
                price={service.online_pricing}
                currency={service.currency}
                handleChangeClick={handleChangeClick}

                />

                </>
            )}
          </div>
        </div>
      </div>

      <div className="py-[25px] px-[42px] flex flex-col lg:flex-row justify-between items-center gap-10 bg-background">
        {selectedDate && selectedSlot && (
          <div className="whitespace-nowrap w-full flex flex-col items-center lg:items-start">
            <p className="text-base md:text-xl/[130%] font-medium">Confirm Your booking</p>
            <div className="flex gap-3.5 items-center mt-2 opacity-70">
              <div className="flex gap-2 items-center">
                <Image
                  src={"/images/calander-icon-rounded.svg"}
                  height={20}
                  width={20}
                  alt="Calander Icon"
                />
                <p className="text-base md:text-xl/[130%] text-[#252525]">{selectedDate}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Image
                  src={"/images/clock-icon.svg"}
                  height={20}
                  width={20}
                  alt="Calander Icon"
                />
                <p className="text-base md:text-xl/[130%] text-[#252525]">{selectedSlot}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col-reverse md:flex-row justify-center lg:justify-end gap-[18px] w-full">
          <Button
            variant={"outline"}
            className="border-[#6B7B8A] text-[#6B7B8A] w-full md:max-w-[202px] h-[58px]"
            onClick={() => router.push(`/${username}`)}
          >
            <Link href={"/experts"}>Back to Expert</Link>
          </Button>
          <Button
            onClick={() => formRef.current?.submitForm()}
            disabled={isProcessing}
            className="text-white w-full md:max-w-[202px] h-[58px]"
          >
            {isProcessing ? "Processing..." : "Continue"}
          </Button>
        </div>
      </div>
       <LoginModal
              open={open}
              setOpen={setOpen}
              step={step}
              handlePhoneSubmit={handlePhoneSubmit}
              handleOtpSubmit={handleOtpSubmit}
              handleDetailsSubmit={handleDetailsSubmit}
              phone={phone}
              loading={loading}
            />
    </div>
  );
}
