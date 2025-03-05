"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EventCard({
  event,
}: {
  event: {
    _id: string;
    image: string;
    title: string;
    description: string;
    location: string;
    start_date: string;
    profile_id: {
      name: string;
    }

  };
}) {
    const router = useRouter();

    const [formattedDate, setFormattedDate] = useState({month: '', date: 0, time: ''});

    // Format date after client-side hydration
    useEffect(() => {
      const formatDateTime = (dateTimeStr: string) => {
        const dateObj = new Date(dateTimeStr);
  
        const month = dateObj.toLocaleString("en-US", { month: "long" }); // "February"
        const date = dateObj.getDate(); // 14
        const time = dateObj.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }); // "5:30 PM"
  
        return { month, date, time };
      };
  
      // Format the date when the component is mounted (client-side only)
      setFormattedDate(formatDateTime(event.start_date));
    }, [event.start_date]);

  const handleNavigate = () => {
    localStorage.setItem("eventData", JSON.stringify(event)); // Save object
    router.push(`/events/${replaceSpacesWithUnderscore(event.title)}`);
  };
function replaceSpacesWithUnderscore(input: string) {
  return input.replace(/\s+/g, "_") ?? "";
}
const maxLength = 90;
const truncatedDescription =
  event.description.length > maxLength
    ? event.description.substring(0, maxLength) + "..."
    : event.description;



  return (
    <div
      className="rounded-[18px] shadow-[0px_8px_30px_0px_rgba(80,85,136,0.06)] py-2 px-3 bg-background flex flex-col justify-between cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        handleNavigate();
      }}
    >
      <div>
        <div className="relative">
          <Image
            src={event.image}
            alt={event.title}
            width={287}
            height={131}
            className="max-h-[131px] w-full rounded-[10px]"
          />
        </div>
        <p className="text-sm font-semibold leading-normal mt-[14px]">
          {event.title}
        </p>
        <p className="text-xs/[19px] tracking-[0.06px] text-[#384853] dark:text-[#A8B4C0]/90 mt-1.5 line-clamp-3">
          {truncatedDescription}
        </p>
        <div className="mt-[22px] flex flex-col gap-[9px]">
          <div className="flex gap-[5px] items-start">
            <Image
              src={"/images/map-pin.svg"}
              height={16}
              width={16}
              alt="Map pin icon"
              className="flex-shrink-0"
            />
            <p className="text-xs leading-normal text-[#2B2849] dark:text-[#A8A4C8]">
              {event.location !== "" ? event.location : "Online"}
            </p>
          </div>
          <div className="flex gap-[5px] items-start">
            <div className="text-xs leading-normal text-[#2B2849] dark:text-[#A8A4C8]">
              <p>{`${formattedDate.month} - ${formattedDate.date}`}</p>
              <p>{formattedDate.time}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary-light py-[7px] px-2.5 flex justify-between rounded-[8px] mt-[18px]">
        <div>
          <p className="text-[#6B7B8A] text-[9px]/[12px]">Host</p>
          <p className="text-[#384853] text-[10px] font-bold leading-[14px]">
            {event.profile_id?.name}
          </p>
        </div>
        <div className="flex items-center justify-center p-2 bg-[#E3F0FD] rounded-full">
          <Image
            src={"/images/link-icon.svg"}
            alt="Link Icon"
            width={16}
            height={16}
          />
        </div>
      </div>
    </div>
  );

  
  // return (
  //   <div className="rounded-[18px] shadow-[0px_8px_30px_0px_rgba(80,85,136,0.06)] py-2 px-3 bg-background flex flex-col justify-between">
  //     <div>
  //     <div className="relative">
  //       <Image
  //         src={event.image}
  //         alt={event.title}
  //         width={287}
  //         height={131}
  //         className="max-h-[131px] w-full rounded-[10px]"
  //       />
  //       {/* <div className="py-1.5 px-3.5 flex flex-col items-center justify-center flex-shrink-0 text-[#F0635A] text-[10px] font-medium rounded-[10px] bg-white/70 absolute top-2 left-2.5 uppercase">
  //         <p className="font-bold text-lg/[100%]">
  //           {formatDateTime(event.start_date).date}
  //         </p>
  //         <p className="font-medium text-[10px]">
  //           {formatDateTime(event.start_date).month}
  //         </p>
  //       </div> */}
  //     </div>
  //     <p className="text-sm font-semibold leading-normal mt-[14px]">
  //       {event.title}
  //     </p>
  //     <p className="text-xs/[19px] tracking-[0.06px] text-[#384853] dark:text-[#A8B4C0]/90 mt-1.5 line-clamp-3">
  //       {truncatedDescription}
  //     </p>
  //     <div className="mt-[22px] flex flex-col gap-[9px]">
  //       <div className="flex gap-[5px] items-start">
  //         <Image
  //           src={"/images/map-pin.svg"}
  //           height={16}
  //           width={16}
  //           alt="Map pin icon"
  //           className="flex-shrink-0"
  //         />
  //         <p className="text-xs leading-normal text-[#2B2849] dark:text-[#A8A4C8]">
  //           {event.location != "" ? event.location : "Online"}
  //         </p>
  //       </div>
  //       <div className="flex gap-[5px] items-start">
  //         {/* <Image
  //           src={"/images/map-pin.svg"}
  //           height={16}
  //           width={16}
  //           alt="Map pin icon"
  //           className="flex-shrink-0"
  //         /> */}
  //         <div className="text-xs leading-normal text-[#2B2849] dark:text-[#A8A4C8]">
  //           <p>
  //             {`${formattedDate.month} - ${
  //               formattedDate.date
  //             }`}
  //           </p>
  //           <p>{formattedDate.time}</p>
  //         </div>
  //       </div>
  //     </div>
  //     </div>
  //     {/* <AvatarGroup users={event.participants} max={2} /> */}
  //     <div           
  //     onClick={(e) => {
  //         e.preventDefault();
  //           handleNavigate();
  //         }} 
  //         className="bg-primary-light py-[7px] px-2.5 flex justify-between rounded-[8px] mt-[18px] cursor-pointer">
  //       <div>
  //         <p className="text-[#6B7B8A] text-[9px]/[12px]">Host</p>
  //         <p className="text-[#384853] text-[10px] font-bold leading-[14px]">
  //           {event.profile_id.name}
  //         </p>
  //       </div>
  //       <div
  //         className="flex items-center justify-center p-2 bg-[#E3F0FD] rounded-full"
  //       >
  //         <Image
  //           src={"/images/link-icon.svg"}
  //           alt="Link Icon"
  //           width={16}
  //           height={16}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
}
