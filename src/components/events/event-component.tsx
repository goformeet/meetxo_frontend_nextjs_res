"use client";
import { collectAuthData } from "@/app/utils/collectAuthData";
import { handlePayment } from "@/app/utils/razorpay";
import LoginModal from "@/components/auth/login-modal";
import SucessPopup from "@/components/auth/successPopup";

import { Button } from "@/components/ui/button";
import {
  eventBooking,
  getAllEventsWithSearch,
  sendOtp,
  setUpProfile,
} from "@/services/api";
import { AuthData } from "@/types/authTypes";
import { Session } from "@/types/sessionTypes";
import axios from "axios";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";
import React, { useEffect, useState } from "react";

type Event = {
  _id: string;
  image: string;
  title: string;
  description: string;
  location: string;
  price: number;
  start_date: string;
  currency: { code: string; symbol: string };
};

// export const metadata = {
//   title: "Upcoming Events – Live Learning & Networking at Meetxo.ai",
//   description:
//     "Join exclusive expert-led events, workshops, and webinars to upskill and grow your network - Meetxo.ai",
//     keywords: "MeetXO events, live expert sessions, virtual events platform, MeetXO expert workshops, join MeetXO webinars, online learning events, MeetXO live sessions, interactive expert discussions, MeetXO speaker sessions, book an event on MeetXO, MeetXO online conferences, industry-specific webinars, professional growth events, learn from top experts, MeetXO networking events",
//   metadataBase: new URL("https://meetxo.ai"),
//   openGraph: {
//   title: "Upcoming Events – Live Learning & Networking at Meetxo.ai",
//     description:
//     "Join exclusive expert-led events, workshops, and webinars to upskill and grow your network - Meetxo.ai",
//     url: "https://meetxo.ai",
//     images: [
//       {
//         url: "/og_image.png",
//         width: 1200,
//         height: 630,
//         alt: "MeetXO Logo",
//       },
//     ],
//   },

// };

export default function EventComponent() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState<Event | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [phone, setPhone] = useState<string>("");
  const [step, setStep] = useState<"phone" | "otp" | "details">("phone");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Session | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [details, setDetails] = useState<{
    name: string;
    email: string;
  }>({ name: "", email: "" });
  const [sucessOpen, setSucessOpen] = useState<boolean>(false);
  const pathname = usePathname();

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
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (otp: string) => {
    try {
      setLoading(true);
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
          if (eventData?.price) {
            makePayment();
          } else {
            bookEvent();
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
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsSubmit = async (detals: {
    name: string;
    email: string;
  }) => {
    setDetails(detals);
    try {
      const session = await getSession();

      if (!session || !session.accessToken) {
        throw new Error("User session not found or accessToken missing");
      }

      const res = await setUpProfile(detals, session.accessToken);
      if (res.success) {
        if (eventData?.price) {
          makePayment();
        } else {
          bookEvent();
        }
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const continueToBooking = () =>
    // dat: { email: string; name: string; phone_number: string },
    // response: { razorpay_order_id: string }
    {
      bookEvent();
    };
  const bookEvent = async () => {
    const session = await getSession();

    if (!session || !session.accessToken) {
      throw new Error("User session not found or accessToken missing");
    }

    const userId = session?.user.user_id;
    const eventId = eventData?._id || "";
    try {
      const data = {
        event_id: eventId,
        user_id: userId ?? "",
        status: "pending",
        booking_amount: eventData?.price || 0,
        booking_status: "pending",
      };
      const res = await eventBooking(data, session.accessToken);
      if (res.success) {
        setSuccessMessage(res.message);
        setSucessOpen(true);
      }
    } catch (error) {
      throw error;
    }
  };

  const formatDateTime = (dateTimeStr: string) => {
    const dateObj = new Date(dateTimeStr);

    const month = dateObj.toLocaleString("en-US", { month: "short" });
    const date = dateObj.getDate();
    const time = dateObj.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }); // "5:30 PM"

    return { month, date, time };
  };
  const makePayment = async () => {
    try {
      const dat = {
        email: details.email || "",
        phone_number: phone || "",
        name: details.name || "",
      };
      const service = {
        name: details.name || "",
        online_pricing: eventData?.price ? eventData?.price : 0,
      };
      const currency = eventData?.currency?.code
        ? eventData?.currency?.code
        : "INR";
      await handlePayment(
        dat,
        service,
        continueToBooking,
        setIsProcessing,
        currency
      );
    } catch (error) {
      console.error(error);
    }
  };
  const registerNow = async () => {
    try {
      setIsProcessing(true);
      if (user) {
        if (eventData?.price) {
          await makePayment();
        } else {
          await bookEvent();
        }
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  // function replaceUnderscoreWithSpaces(input: string): string {
  //   return input.replace(/-+/g, " ");
  // }

  // function replaceSpacesWithUnderscore(input: string) {
  //   return input.replace(/\s+/g, "_") ?? "";
  // }
  useEffect(() => {
    if (sucessOpen) {
      const timer = setTimeout(() => {
        router.push(`/`);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [sucessOpen]);

  // useEffect(() => {
  //   const storedData = localStorage.getItem("eventData");

  //   if (storedData) {
  //     const event = JSON.parse(storedData);
  //     // const decodedTitle = replaceUnderscoreWithSpaces(pathname.split("/").pop() || "");
  //     const pathTitle = pathname.split("/").pop() || "";
  //     const eventTitle = replaceSpacesWithUnderscore(event.title);

  //     console.log(event);

  //     if (eventTitle === pathTitle) {
  //       setEventData(event);

  //       //  router.push("/")
  //     }
  //   } else {
  //     // router.push("/")
  //   }
  // }, [pathname]);

  useEffect(() => {
    const fetchEventData = async () => {
      const pathTitle = pathname.split("/").pop() || "";

      const decodedTitle = pathTitle.replace(/_/g, " ");

      try {
        console.log(3);

        const { data } = await getAllEventsWithSearch(decodedTitle);

        const event = data[0];

        setEventData(event);
      } catch (error) {
        console.log(5);

        console.error("Error fetching event data:", error);
        // router.push("/")
      }
    };

    fetchEventData();
  }, [pathname]);

  const getUser = async () => {
    const session = await getSession();
    setUser(session as Session);
  };

  useEffect(() => {
    const sendFacebookEvent = async () => {
      try {
        const response = await fetch("/api/facebook-event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Failed to send Facebook event");
        }
      } catch (error) {
        console.error("Error sending Facebook event:", error);
      }
    };

    // Send event when component mounts
    sendFacebookEvent();
  }, []);

  useEffect(() => {
    getUser();
  }, []);
  return (
    <main className="px-4 md:px-7 lg:px-10 max-w-8xl mx-auto py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section: Banner & About Event */}
        <div className="flex flex-col gap-6">
          <div className="w-full max-w-[1066px] aspect-[1066/418]">
            <Image
              src={
                eventData?.image ? eventData?.image : "/images/event-item.png"
              }
              alt="event banner"
              width={1066}
              height={418}
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
          <div>
            <p className="font-semibold mb-4">About the event:</p>
            <p className="whitespace-pre-line">{eventData?.description}</p>
          </div>
        </div>

        {/* Right Section: Event Details & Registration */}
        <div>
          <div className="flex gap-2.5 items-center mb-2 bg-primary-light rounded-md w-fit py-1 px-2">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <Image
              src="/images/event-label.svg"
              height={18}
              width={18}
              alt="Event Label"
            />
            <p className="text-sm font-semibold text-[#1D8FD1]">
              Private Event
            </p>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3">
            {eventData?.title}
          </h1>
          <div className="flex gap-3 items-center flex-shrink-0 mb-3">
            <div className="flex flex-shrink-0 flex-col justify-center gap-0.5 rounded-lg overflow-hidden border border-[#DEDEDF] bg-[#F6F6F6] text-muted-foreground font-bold text-sm">
              <p className="px-3 pt-1 text-xs">
                {formatDateTime(eventData?.start_date ?? "").month}
              </p>
              <div className="pb-1 bg-white">
                <p className="text-center"> </p>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 text-muted-foreground text-sm">
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
                src="/images/google-meet-icon.png"
                alt="Google Meet"
                width={50}
                height={50}
                className="h-6 w-6"
              />
            </div>
            <p className="text-base font-semibold text-muted-foreground">
              Online Meet
            </p>
          </div>
          <div className="rounded-lg border border-muted-foreground/70 overflow-hidden max-w-md">
            <p className="p-2 font-semibold bg-primary-light">Registration</p>
            <div className="p-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-muted rounded-lg">
                  <Image
                    alt="Calander Icon"
                    src="/images/calander-icon-rounded.svg"
                    height={24}
                    width={24}
                  />
                </div>
                <div className="flex flex-col gap-0.5 text-muted-foreground text-xs">
                  <p className="font-bold">
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
                    {new Date(eventData?.start_date ?? "").toLocaleString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}{" "}
                    (GMT +05:30)
                  </p >
                  {eventData?.price ? (
                    <p className="text-lg" > {`${
                      eventData?.currency?.symbol
                        ? eventData?.currency?.symbol
                        : "$"
                    } ${eventData?.price}`}</p>
                  ) : (
                    <p className="text-green-500 ">Free</p>
                  )}
                </div>
              </div>
              <div className="h-[1px] w-full bg-muted-foreground/50 my-3"></div>
              <p className="text-base font-semibold mb-3">
                Welcome! To join the event, please register below.
              </p>
              {isProcessing ? (
                <Button disabled className="text-white w-full">
                  Processing...
                </Button>
              ) : (
                <Button
                  onClick={() => registerNow()}
                  className="text-white w-full"
                >
                  Register Now
                </Button>
              )}
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
          <SucessPopup
            open={sucessOpen}
            setOpen={setSucessOpen}
            message={successMessage}
          />
        </div>
      </div>

      <div className="mt-10 text-sm text-gray-300">
        {/* <p>Keywords: {eventData?.keywords?.join(", ")}</p> */}
        <p>Keywords: MeetXO Events, Events in bengaluru , Online Webinar</p>
      </div>
    </main>
  );
  // useEffect(()=>{
  //   getUser()
  // },[])

  //   return (
  //     <main className="px-4 md:px-7 lg:px-10 max-w-5xl mx-auto py-20">
  //       <div className="flex gap-2.5 items-center mb-2 bg-primary-light rounded-md w-fit py-1 px-2">
  //         <Script src="https://checkout.razorpay.com/v1/checkout.js" />
  //         <Image
  //           src={"/images/event-label.svg"}
  //           height={18}
  //           width={18}
  //           alt="Event Label"
  //         />
  //         <p className="text-sm font-semibold text-[#1D8FD1]">Private Event</p>
  //       </div>
  //       <Image
  //         src={eventData?.image ? eventData?.image : "/images/event-item.png"}
  //         alt={"event banner"}
  //         width={1435}
  //         height={655}
  //         className="h-[400px] w-auto max-w-full object-cover rounded-[10px] mb-4"
  //       />
  //       <h1 className="text-xl sm:text-2xl md:text-5xl font-bold mb-3">
  //         {eventData?.title}
  //       </h1>
  //       <div className="flex gap-3 items-center flex-shrink-0 mb-3">
  //         <div className="flex flex-shrink-0 flex-col justify-center gap-0.5 rounded-lg overflow-hidden border border-[#DEDEDF] bg-[#F6F6F6] text-muted-foreground font-bold text-sm">
  //           <p className="px-3 pt-1 text-xs">
  //             {" "}
  //             {formatDateTime(eventData?.start_date ?? "").month}
  //           </p>
  //           <div className="pb-1 bg-white">
  //             <p className="text-center"> </p>
  //           </div>
  //         </div>
  //         <div className="flex flex-col gap-0.5 text-muted-foreground text-sm">
  //           <p className="font-bold">
  //             {" "}
  //             {new Date(eventData?.start_date ?? "").toLocaleDateString("en-US", {
  //               weekday: "short",
  //             })}
  //             ,{" "}
  //             {new Date(eventData?.start_date ?? "").toLocaleDateString("en-US", {
  //               day: "2-digit",
  //               month: "short",
  //             })}
  //           </p>
  //           <p>
  //             {" "}
  //             {new Date(eventData?.start_date ?? "").toLocaleString("en-US", {
  //               hour: "2-digit",
  //               minute: "2-digit",
  //               hour12: true,
  //             })}{" "}
  //             (GMT +05:30)
  //           </p>
  //         </div>
  //       </div>
  //       <div className="flex items-center gap-2.5 mb-3">
  //         <div className="border border-muted-foreground/70 w-fit p-2 rounded-lg">
  //           <Image
  //             src={"/images/google-meet-icon.png"}
  //             alt="Google Meet"
  //             width={50}
  //             height={50}
  //             className="h-6 w-6"
  //           />
  //         </div>
  //         <p className="text-base font-semibold text-muted-foreground">
  //           Google Meet
  //         </p>
  //       </div>
  //       {/*       <div className="flex items-center gap-2.5 mb-3">
  //         <Avatar className="h-8 w-8">
  //           <AvatarImage
  //             src="/images/avatar.svg"
  //             className="object-cover object-center"
  //           />
  //         </Avatar>
  //         <p className="text-base font-semibold text-muted-foreground">
  //           Hosted By Sen Janson
  //         </p>
  //       </div> */}
  //       <div className="rounded-lg border border-muted-foreground/70 overflow-hidden max-w-md">
  //         <p className="p-2 font-semibold bg-primary-light">Registration</p>
  //         <div className="p-2">
  //           <div className="flex items-center gap-2.5">
  //             <div className="p-2 bg-muted rounded-lg">
  //               <Image
  //                 alt="Calander Icon"
  //                 src={"/images/calander-icon-rounded.svg"}
  //                 height={24}
  //                 width={24}
  //               />
  //             </div>
  //             <div className="flex flex-col gap-0.5 text-muted-foreground text-xs">
  //               <p className="font-bold">
  //                 {" "}
  //                 {new Date(eventData?.start_date ?? "").toLocaleDateString(
  //                   "en-US",
  //                   {
  //                     weekday: "short",
  //                   }
  //                 )}
  //                 ,{" "}
  //                 {new Date(eventData?.start_date ?? "").toLocaleDateString(
  //                   "en-US",
  //                   {
  //                     day: "2-digit",
  //                     month: "short",
  //                   }
  //                 )}
  //               </p>
  //               <p>
  //                 {new Date(eventData?.start_date ?? "").toLocaleString("en-US", {
  //                   hour: "2-digit",
  //                   minute: "2-digit",
  //                   hour12: true,
  //                 })}{" "}
  //                 (GMT +05:30)
  //               </p>
  //               {eventData?.price ? (
  //                 <p>{`${eventData?.currency.symbol} ${eventData?.price}`}</p>
  //               ) : (
  //                 <p className="text-green-500">Free</p>
  //               )}
  //             </div>
  //           </div>
  //           <div className="h-[1px] w-full bg-muted-foreground/50 my-3"></div>
  //           <p className="text-base font-semibold mb-3">
  //             Welcome! To join the event, please register below.
  //           </p>
  //           {/* <Button onClick={() => setOpen(true)} className="text-white w-full"> */}
  //           {isProcessing ? (
  //             <Button disabled={true} className="text-white w-full">
  //               Processing...
  //             </Button>
  //           ) : (
  //             <Button onClick={() => registerNow()} className="text-white w-full">
  //               Register Now
  //             </Button>
  //           )}
  //         </div>
  //       </div>
  //       <div className="mt-10">
  //         <p className="font-semibold mb-4">About the event:</p>
  //         <p className="whitespace-pre-line">{eventData?.description}</p>
  //       </div>
  //       {/* {user ? (
  //         <EventBookingModal
  //           open={open}
  //           setOpen={setOpen}
  //           register={register}
  //           isProcessing={isProcessing}
  //         />
  //       ) : ( */}
  //       <LoginModal
  //         open={open}
  //         setOpen={setOpen}
  //         step={step}
  //         handlePhoneSubmit={handlePhoneSubmit}
  //         handleOtpSubmit={handleOtpSubmit}
  //         handleDetailsSubmit={handleDetailsSubmit}
  //         phone={phone}
  //         loading={loading}
  //       />
  //       {/* )} */}
  //       <SucessPopup open={sucessOpen} setOpen={setSucessOpen} />
  //     </main>
  //   );
}
