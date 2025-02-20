'use client'
import { collectAuthData } from '@/app/utils/collectAuthData';
import { handlePayment } from '@/app/utils/razorpay';
import LoginModal from '@/components/auth/login-modal';
import EventBookingModal from '@/components/booking/event-booking-modal';
// import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import { sendOtp, setUpProfile, verifyOtp } from '@/services/api';
import { AuthData } from '@/types/authTypes';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import React, { useEffect, useState } from 'react'

type  Event= {
    _id: string;
    image: string;
    title: string;
    description: string;
    location: string;
    price:number
    start_date: string;
    // time: string;
    // host: string;
  };

export default function Page() {
      // const router = useRouter();
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState<Event | null>(null);
  const[isProcessing,setIsProcessing]=useState(false)
   const [phone, setPhone] = useState<string>("");
   const [step, setStep] = useState<"phone" | "otp" | "details">("phone");
   const [otp, setOtp] = useState<string>("");
    //  const [details, setDetails] = useState<{ userName: string; email: string }>({ userName: '', email: '' });
 const pathname = usePathname();

const token = localStorage.getItem("token");
const register = async (data:{email:string,name:string}) => {
  const dat = {
    email: "",
    phone_number: "",
    name: "",
  };
  const service = {
    name: "",
    online_pricing: eventData?.price ? eventData?.price : 1,
  };
  try {
    setIsProcessing(true);
    await setUpProfile(data)
    await handlePayment(dat, service, continueToBooking, setIsProcessing);
  } catch (error) {
    console.error(error);
  } finally {
    setIsProcessing(false);
  }
};
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
console.log(otp);

      //  const handleDetailsSubmit = async (detals: {
      //    userName: string;
      //    email: string;
      //  }) => {
      //    setDetails(detals);
      //    try {
      //      const res = await setUpProfile(detals);
      //      console.log(res);
      //      if (res.success) {
      //      } else {
      //        alert(res.message);
      //      }
      //    } catch (error) {
      //      console.error(error);
      //    }
      //  };
     
const continueToBooking=( dat: { email: string; name: string; phone_number: string },
    response: { razorpay_order_id: string })=>{
      console.log(response);
      console.log(dat);
      
      

}
 useEffect(() => {
   const storedData = localStorage.getItem("eventData");
   if (storedData) {
     const event = JSON.parse(storedData);
     const decodedTitle = decodeURIComponent(pathname.split("/").pop() || "");

     if (event.title === decodedTitle) {
       setEventData(event);
       
      //  router.push("/")
     }
   }else{
    // router.push("/")
   }
 }, [pathname]);

const formatDateTime = (dateTimeStr: string) => {
  const dateObj = new Date(dateTimeStr);

  const month = dateObj.toLocaleString("en-US", { month: "short" }); // "February"
  const date = dateObj.getDate(); // 14
  const time = dateObj.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }); // "5:30 PM"

  return { month, date, time };
};

  return (
    <main className="px-4 md:px-7 lg:px-10 max-w-5xl mx-auto py-20">
      <div className="flex gap-2.5 items-center mb-2 bg-primary-light rounded-md w-fit py-1 px-2">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <Image
          src={"/images/event-label.svg"}
          height={18}
          width={18}
          alt="Event Label"
        />
        <p className="text-sm font-semibold text-[#1D8FD1]">Private Event</p>
      </div>
      <Image
        src={eventData?.image ? eventData?.image : "/images/event-item.png"}
        alt={"event banner"}
        width={287}
        height={131}
        className="h-[400px] w-auto max-w-full object-cover rounded-[10px] mb-4"
      />
      <h1 className="text-xl sm:text-2xl md:text-5xl font-bold mb-3">
        {eventData?.title}
      </h1>
      <div className="flex gap-3 items-center flex-shrink-0 mb-3">
        <div className="flex flex-shrink-0 flex-col justify-center gap-0.5 rounded-lg overflow-hidden border border-[#DEDEDF] bg-[#F6F6F6] text-muted-foreground font-bold text-sm">
          <p className="px-3 pt-1 text-xs">
            {" "}
            {formatDateTime(eventData?.start_date ?? "").month}
          </p>
          <div className="pb-1 bg-white">
            <p className="text-center"> </p>
          </div>
        </div>
        <div className="flex flex-col gap-0.5 text-muted-foreground text-sm">
          <p className="font-bold">
            {" "}
            {new Date(eventData?.start_date ?? "").toLocaleDateString("en-US", {
              weekday: "short",
            })}
            ,{" "}
            {new Date(eventData?.start_date ?? "").toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
            })}
          </p>
          <p>
            {" "}
            {new Date(eventData?.start_date ?? "").toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}{" "}
            (GMT +05:30)
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="border border-muted-foreground/70 w-fit p-2 rounded-lg">
          <Image
            src={"/images/google-meet-icon.png"}
            alt="Google Meet"
            width={50}
            height={50}
            className="h-6 w-6"
          />
        </div>
        <p className="text-base font-semibold text-muted-foreground">
          Google Meet
        </p>
      </div>
{/*       <div className="flex items-center gap-2.5 mb-3">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src="/images/avatar.svg"
            className="object-cover object-center"
          />
        </Avatar>
        <p className="text-base font-semibold text-muted-foreground">
          Hosted By Sen Janson
        </p>
      </div> */}
      <div className="rounded-lg border border-muted-foreground/70 overflow-hidden max-w-md">
        <p className="p-2 font-semibold bg-primary-light">Registration</p>
        <div className="p-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-muted rounded-lg">
              <Image
                alt="Calander Icon"
                src={"/images/calander-icon-rounded.svg"}
                height={24}
                width={24}
              />
            </div>
            <div className="flex flex-col gap-0.5 text-muted-foreground text-xs">
              <p className="font-bold">
                {" "}
                {new Date(eventData?.start_date ?? "").toLocaleDateString(
                  "en-US",
                  {
                    weekday: "short",
                  }
                )}
                ,{" "}
                {new Date(eventData?.start_date ?? "").toLocaleDateString(
                  "en-US",
                  {
                    day: "2-digit",
                    month: "short",
                  }
                )}
              </p>
              <p>
                {new Date(eventData?.start_date ?? "").toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}{" "}
                (GMT +05:30)
              </p>
            </div>
          </div>
          <div className="h-[1px] w-full bg-muted-foreground/50 my-3"></div>
          <p className="text-base font-semibold mb-3">
            Welcome! To join the event, please register below.
          </p>
          <Button onClick={() => setOpen(true)} className="text-white w-full">
            Register Now
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <p className="font-semibold mb-4">About the event:</p>
        <p className="whitespace-pre-line">{eventData?.description}</p>
      </div>
      {token ? (
        <EventBookingModal
        open={open}
        setOpen={setOpen}
        register={register}
        isProcessing={isProcessing}
      />
        
      ) : (
        <LoginModal
          open={open}
          setOpen={setOpen}
          step={step}
          handlePhoneSubmit={handlePhoneSubmit}
          handleOtpSubmit={handleOtpSubmit}
          // handleDetailsSubmit={handleDetailsSubmit}
        />
      )}
    </main>
  );
}
