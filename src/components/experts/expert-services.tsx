'use client'
import React, { useEffect, useState, useTransition } from 'react'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Clock3, Loader } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
// import Image from 'next/image';
// import OneOneCard from '../one-one-card';
// import EventCard from '../event-card';
import Dot from '../dot';
import { getEventsByHost, getServicesById } from '@/services/api';
import { useRouter } from 'next/navigation';
import EmptyData from '../empty-data';
import EventCard from '../event-card';
// import { getSession } from 'next-auth/react';

type Service = {
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
  location: [number, number];
  is_active: boolean;
  currency: { code: string; symbol: string };
  created_at: string;
  updated_at: string;
  __v: number;
};
type ExpertServicesProps={
  username:string
  id:string
 
}
type EventType= {
  _id: string;
  user_id: string;

  max_participants: number;

  meeting_link: string;
  title: string;
  description: string;
  price: number;
  image: string;
  type: string;
  start_date: string;
  location: string;
  created_at: string;
  updated_at: string;
  __v: number;
  profile_id: {
    name: string;
  }
}


export default function ExpertServices({ id, username }: ExpertServicesProps) {
  const [category, setCategory] = useState("1:1 Call");
  const [services, setServices] = useState<Service[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [isPending, startTransition] = useTransition();
  const [selectedId,setSelectedId]=useState("")
  const router = useRouter();
  const categories = [
    { id: 2, name: "1:1 Call" },
    { id: 3, name: "Events" },
    { id: 4, name: "Digital Product" }
  ];

  const getServices = async () => {
    try {
      //  const session = await getSession();
      
      //    if (!session || !session.accessToken) {
      //      throw new Error("User session not found or accessToken missing");
      //    }
      const res = await getServicesById(id);
     

      if (res.success) {
        setServices(res.services);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function replaceSpacesWithUnderscore(input: string) {
    return input.replace(/\s+/g, "_") ?? "";
  }
const getEvents= async()=>{
  try {
    const res = await getEventsByHost(id);
    if(res.success){
      setEvents(res.data);
    }
  } catch (error) {
    console.error(error)
    
  }
}
  const handleClick = (id: string,name:string) => {

localStorage.setItem("meet_service_id", id);
     startTransition(() => {
        router.push(`${username}/booking/${replaceSpacesWithUnderscore(name)}`)
     });
   };

  useEffect(() => {
    getServices();
  }, [id]);

  useEffect(() => {
    getEvents();
  }, [id]);
  return (
    <>
      <div className="my-5 px-5 py-3 bg-primary-light rounded-[14px] flex gap-3 overflow-x-scroll no-scrollbar">
        {/* <Button variant={'outline'} onClick={() => setCategory('All')} className={cn("bg-transparent text-base/6 font-normal capitalize py-4 px-6 leading-normal rounded-[12px] h-fit shadow-none border-foreground hover:bg-foreground hover:text-background transition-all", { 'bg-foreground text-white dark:text-background font-bold': category === 'All' })}>All</Button> */}
        {categories.map((categ) => (
          <Button
            variant={"outline"}
            key={categ.id}
            onClick={() => setCategory(categ.name)}
            className={cn(
              "bg-transparent text-sm md:text-base/6 font-normal capitalize py-2.5 md:py-4 px-4 md:px-6 leading-normal rounded-lg md:rounded-[12px] h-fit shadow-none border-foreground hover:bg-foreground hover:text-background transition-all",
              {
                "bg-foreground text-white dark:text-background font-bold":
                  categ.name === category,
              }
            )}
          >
            {categ.name}
          </Button>
        ))}
      </div>
      <div className="space-y-[18px] mb-[169px]">
        {category === '1:1 Call' && services.length ? (
          services.map((data) => {
            return (
              <div
                key={data._id}
                className="p-4 border border-[#E0E0E0] rounded-[16px] flex justify-between"
              >
                <div>
                  <p
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setSelectedId(data._id);
                      handleClick(data._id,data.name);
                    }}
                    className={cn(
                      "text-xl/[130%] font-medium mb-2 cursor-pointer transition-colors duration-300",
                      selectedId === data._id ? "text-gray-400" : "text-black"
                    )}
                  >
                    {data.name}
                  </p>

                  <div className="flex items-center gap-2">
                    <p className="text-[#7C7C7C] text-base/[150%]">
                      {/* By Sen Janson */}
                      {data.short_description}
                    </p>
                    {/*                     <Dot /> */}

                    {/* <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-[#FBBC05]" />
                      <p className="text-[#7C7C7C] text-base/[150%]">
                        4.8 (122)
                      </p>
                    </div> */}
                  </div>
                  <div className="my-4 flex gap-2 items-center">
                    <div className="flex gap-1 items-center">
                      <Clock3 className="text-foreground" />
                      <p className="text-[#7C7C7C] text-sm">
                        {data.duration} Minutes
                      </p>
                    </div>
                    <Dot />

                    <div className="flex gap-1 items-center">
                      <p className="text-[#7C7C7C] text-sm">
                        {data.is_offline_available
                          ? "Online & Offline"
                          : "Online"}
                      </p>
                    </div>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem
                      className="border-none w-fit items-center"
                      value="details"
                    >
                      <AccordionTrigger
                        icon="/images/more-details-icon.svg"
                        className="font-semibold text-2xl/8 tracking-[-1%] text-left w-fit"
                      >
                        <p className="text-sm/[155%] mr-1 text-primary font-normal">
                          View Details
                        </p>
                      </AccordionTrigger>
                      <AccordionContent className="text-[#7E8492] pb-0 mt-4 font-medium text-base/[150%]">
                        {data.long_description}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="flex flex-col justify-between items-end">
                  {data.online_pricing ? (
                    <p className="text-[32px]/[120%] font-medium font-roboto">
                      {data?.currency?.symbol ? data?.currency?.symbol : "$"}
                      {data.online_pricing}
                    </p>
                  ) : (
                    <span className="text-[#52c627]">Free</span>
                  )}

                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedId(data._id);
                      handleClick(data._id,data.name);
                    }}
                    disabled={isPending}
                    className={cn(
                      "font-roboto text-sm/normal font-semibold capitalize py-[9px] px-[16px] leading-normal rounded-[8px] h-fit text-white shadow-none"
                    )}
                  >
                    {isPending && selectedId == data._id ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      " Book Session"
                    )}
                  </Button>
                </div>
              </div>
            );
          })
        ) : 
        category === 'Events' 
        && events.length ? (
                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5">
                        {events.map((event) => (
                          <EventCard key={event._id} event={event} />
                        ))}
                      </div>
        ) : 
        <EmptyData />}


        {/* <div className='p-4 border border-[#E0E0E0] rounded-[16px] flex justify-between '>
                    <div className='flex gap-[34px]'>
                        <Image src={'/images/event-item.png'} alt='Event Image' width={177} height={134} className='rounded-[8px] h-full w-[177px] my-auto object-cover object-center' />
                        <div>
                            <p className='text-xl/[130%] font-medium mb-2'>Building a successful business - 1:1 Mentoring</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-[#7C7C7C] text-base/[150%]'>By Sen Janson</p>
                                <Dot />
                                <div className='flex items-center gap-1'>
                                    <Star className="h-5 w-5 text-[#FBBC05]" />
                                    <p className='text-[#7C7C7C] text-base/[150%]'>4.8 (122)</p>
                                </div>
                            </div>
                            <div className='my-4 flex gap-2 items-center'>
                                <div className='flex gap-1 items-center'>
                                    <Image src={'/images/map-pin.svg'} alt='Location Icon' width={16} height={16} />
                                    <p className='text-[#2B2849] text-xs'>36 Guild Street London, UK </p>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <Image src={'/images/map-pin.svg'} alt='Location Icon' width={16} height={16} />
                                    <p className='text-[#2B2849] text-xs'>Wed, 1 Jan`25, 20:30 - 21:30 GMT+05:30</p>
                                </div>
                            </div>
                            <Accordion type="single" collapsible>
                                <AccordionItem className="border-none w-fit items-center" value="details">
                                    <AccordionTrigger icon='/images/more-details-icon.svg' className="font-semibold text-2xl/8 tracking-[-1%] text-left w-fit">
                                        <p className='text-sm/[155%] mr-1 text-primary font-normal'>View Details</p>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-[#7E8492] pb-0 mt-4 font-medium text-base/[150%]">
                                        Some details about the topic.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between items-end'>
                        <p className='text-[32px]/[120%] font-medium font-roboto'>$128</p>
                        <Button className={cn("font-roboto text-sm/normal font-semibold capitalize py-[9px] px-[16px] leading-normal rounded-[8px] h-fit text-white shadow-none")}>
                            Book Session
                        </Button>
                    </div>
                </div> */}
      </div>
      {/* <div className="mt-[22px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
        {services.map((event) => (
          <OneOneCard key={event._id} event={event} />
        ))}
      </div> */}
      {/* <div className="mt-[22px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div> */}
    </>
  );
}
