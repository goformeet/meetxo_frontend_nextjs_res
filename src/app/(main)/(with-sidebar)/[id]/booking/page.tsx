'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button';
import DateAndSlotSelection from '@/components/booking/date-and-slotp-selection';
import BookingForm, { BookingFormRef } from '@/components/booking/booking-form';
import { bookMeeting, getSingleService, getTiming, Hosts } from '@/services/api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { convertToISOString, formatSlots, getNext30Days } from '@/app/utils/booking';
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
  created_at: string;
  updated_at: string;
  __v: number;
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
  
  const [user, setUser] = useState({ name: "", profile_image: "" });
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
    created_at: "",
    updated_at: "",
    __v: 0,
  });
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const username = segments[0]; 
  const dates=getNext30Days()

  const handleDateClick = async (date: string) => {
    setSelectedDate(date);
    // const selectedDateObject = dates.find(d => d.date === date);
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
      const mtTime =
        selectedDate && selectedSlot
          ? convertToISOString(selectedDate, selectedSlot)
          : "";
      const postData = {
        host_id: service.user_id,
        meeting_time: mtTime,
        meeting_type: "online",
        meeting_description: "",
        service_id: service._id,
        razorpay_payment_id: "hjsda",
        email: data.email,
        phone_number: data.phone,
      };
      console.log(postData);

      // const res=await bookMeeting(postData)
    } catch (error) {}
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

      setUser(dat.hosts.hosts[0]);
    } catch (error) {
      console.error(error);
      
    }
  };
  const handleChangeClick=()=>{
    setSelectedDate(""),
    setSelectedSlot("")
  }
  useEffect(() => {
    getService();
    getUser();
  }, []);

  return (
    <div className="pl-5 pr-[35px] max-w-[calc(100%-105px)] w-full relative lg:h-[calc(100svh-80px)] flex flex-col justify-between">
      <div>
        <Link href={"/"} className="flex gap-1.5 items-center py-5">
          <Image
            src={"/images/back-icon.svg"}
            alt="Back Icon"
            width={22}
            height={22}
          />
          <p className="text-[22px]/7 font-bold">Booking Session </p>
        </Link>
        <div className="lg:max-h-[calc(100vh-270px)] overflow-y-auto no-scrollbar">
          <div className="my-5 flex flex-col lg:flex-row gap-10 ">
            <div className="rounded-[16px] border border-[#E3E6EA] overflow-hidden lg:w-3/5">
              <div className="bg-[rgba(10,102,194,0.15)] py-7 px-10 w-full">
                <div className="flex gap-4">
                  <Avatar className="h-[54px] w-[54px]">
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
                    <h1 className="text-2xl/9 font-bold">{user.name}</h1>
                    <p className="text-base/6">{username}</p>
                  </div>
                </div>
                <p className="mt-6 text-lg/7 font-semibold max-w-[551px]">
                  {service.name}
                </p>
              </div>
              <div className="flex border-b border-[#E3E8ED]">
                <div className="w-1/2 py-[22px] px-10 border-r-[0.5px] border-[#E3E8ED]">
                  <div className="w-fit py-2 px-3 flex justify-center items-center gap-1 rounded-[24px] border border-foreground">
                    <p className="text-[#727272] text-xs/4 font-medium line-through">
                      ₹ {(service.online_pricing * 1.2).toFixed(2)}
                    </p>
                    <p className="text-base/5 font-bold">
                      ₹{service.online_pricing.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="w-1/2 py-[22px] px-10">
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
              <p className="text-base/7 py-7 px-10">
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
              <BookingForm
                ref={formRef}
                handleFormSubmit={handleFormSubmit}
                selectedSlot={selectedSlot}
                selectedDate={selectedDate}
                allSlots={allSlots}
                price={service.online_pricing}
                handleChangeClick={handleChangeClick}
              />
            )}
          </div>
        </div>
      </div>

      <div className="py-[25px] px-[42px] flex flex-col lg:flex-row justify-between items-center gap-10 bg-background">
        {selectedDate && selectedSlot && (
          <div className="whitespace-nowrap w-full flex flex-col items-center lg:items-start">
            <p className="text-xl/[130%] font-medium">Confirm Your booking</p>
            <div className="flex gap-3.5 items-center mt-2 opacity-70">
              <div className="flex gap-2 items-center">
                <Image
                  src={"/images/calander-icon-rounded.svg"}
                  height={20}
                  width={20}
                  alt="Calander Icon"
                />
                <p className="text-xl/[130%] text-[#252525]">{selectedDate}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Image
                  src={"/images/clock-icon.svg"}
                  height={20}
                  width={20}
                  alt="Calander Icon"
                />
                <p className="text-xl/[130%] text-[#252525]">{selectedSlot}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center lg:justify-end gap-[18px] w-full">
          <Button
            variant={"outline"}
            className="border-[#6B7B8A] text-[#6B7B8A] w-full max-w-[202px] h-[58px]"
            onClick={() => router.push(`/${username}`)}
          >
            <Link href={"/explore"}>Back to Experts</Link>
          </Button>
          <Button
            onClick={() => formRef.current?.submitForm()}
            className="text-white w-full max-w-[202px] h-[58px]"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
