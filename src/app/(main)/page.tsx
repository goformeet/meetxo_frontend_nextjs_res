'use client';
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from "lucide-react";
import Link from "next/link";
import { AvatarGroup } from "@/components/avatar-group";
import Marquee from "react-fast-marquee";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HomeBanner from "@/components/home/home-banner";
import SupportSection from "@/components/home/support-section";
import ProfessionalsSection from "@/components/home/professionals-section";




export default function Home() {






  const reviews = [
    {
      avatar: '/images/avatar.svg',
      name: 'Savannah Nguyen',
      profession: 'CEO Sans Brothers',
      message: 'It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.'
    },
    {
      avatar: '/images/avatar.svg',
      name: 'Eleanor Pena',
      profession: 'CEO Sans Brothers',
      message: 'It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.'
    },
    {
      avatar: '/images/avatar.svg',
      name: 'Savannah Nguyen',
      profession: 'CEO Sans Brothers',
      message: 'It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.'
    },
    {
      avatar: '/images/avatar.svg',
      name: 'Eleanor Pena',
      profession: 'CEO Sans Brothers',
      message: 'It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.'
    },
    {
      avatar: '/images/avatar.svg',
      name: 'Savannah Nguyen',
      profession: 'CEO Sans Brothers',
      message: 'It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.'
    },
  ];

  const events = [
    {
      id: 1,
      title: 'Masterclass for empowering with AI for 2025',
      description: 'Masterclass for empowering with AI for job securing',
      image: '/images/event-item.png',
      location: '36 Guild Street London, UK ',
      date: 'Wed, 1 Jan`25',
      time: '20:30 - 21:30 GMT+05:30',
      host: 'Pratiksha Chavhan',
      url: '/',
      participants: [
        {
          id: 1,
          name: 'Savannah Nguyen',
          avatar: '/images/avatar.svg'
        },
        {
          id: 2,
          name: 'Savannah Nguyen',
          avatar: '/images/avatar.svg'
        },
        {
          id: 3,
          name: 'Savannah Nguyen',
          avatar: '/images/avatar.svg'
        },
      ]
    },
    {
      id: 2,
      title: 'Masterclass for empowering with AI for 2025',
      description: 'Masterclass for empowering with AI for job securing',
      image: '/images/event-item.png',
      location: '36 Guild Street London, UK ',
      date: 'Wed, 1 Jan`25',
      time: '20:30 - 21:30 GMT+05:30',
      host: 'Pratiksha Chavhan',
      url: '/',
      participants: [
        {
          id: 1,
          name: 'Savannah Nguyen',
          avatar: '/images/avatar.svg'
        },
        {
          id: 2,
          name: 'Savannah Nguyen',
          avatar: '/images/avatar.svg'
        },
        {
          id: 3,
          name: 'Savannah Nguyen',
          avatar: '/images/avatar.svg'
        },
      ]
    },
    {
      id: 3,
      title: 'Masterclass for empowering with AI for 2025',
      description: 'Masterclass for empowering with AI for job securing',
      image: '/images/event-item.png',
      location: '36 Guild Street London, UK ',
      date: 'Wed, 1 Jan`25',
      time: '20:30 - 21:30 GMT+05:30',
      host: 'Pratiksha Chavhan',
      url: '/',
      participants: [
        {
          id: 1,
          name: 'Savannah Nguyen',
          avatar: '/images/avatar.svg'
        },
        {
          id: 2,
          name: 'Savannah Nguyen',
          avatar: '/images/avatar.svg'
        },
        {
          id: 3,
          name: 'Savannah Nguyen',
          avatar: '/images/avatar.svg'
        },
      ]
    },
    {
      id: 4,
      title: 'Masterclass for empowering with AI for 2025',
      description: 'Masterclass for empowering with AI for job securing',
      image: '/images/event-item.png',
      location: '36 Guild Street London, UK ',
      date: 'Wed, 1 Jan`25',
      time: '20:30 - 21:30 GMT+05:30',
      host: 'Pratiksha Chavhan',
      url: '/',
      participants: [
        {
          id: 1,
          name: 'Savannah Nguyen',
          avatar: '/images/avatar.svg'
        },
        {
          id: 2,
          name: 'Savannah Nguyen',
          avatar: '/images/avatar.svg'
        },
        {
          id: 3,
          name: 'Savannah Nguyen',
          avatar: '/images/avatar.svg'
        },
      ]
    },
    {
      id: 5,
      title: 'Masterclass for empowering with AI for 2025',
      description: 'Masterclass for empowering with AI for job securing',
      image: '/images/event-item.png',
      location: '36 Guild Street London, UK ',
      date: 'Wed, 1 Jan`25',
      time: '20:30 - 21:30 GMT+05:30',
      host: 'Pratiksha Chavhan',
      url: '/',
      participants: [
        {
          id: 1,
          name: 'Savannah Nguyen',
          avatar: '/images/avatar.svg'
        },
        {
          id: 2,
          name: 'Savannah Nguyen',
          avatar: '/images/avatar.svg'
        },
        {
          id: 3,
          name: 'Savannah Nguyen',
          avatar: '/images/avatar.svg'
        },
      ]
    },
  ];

  const platforms = [
    {
      image: '/images/affiliates.png',
      title: 'Affiliates',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
    },
    {
      image: '/images/whats-app.png',
      title: 'WhatsApp Integrations',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
    },
    {
      image: '/images/courses.png',
      title: 'Courses',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
    },
    {
      image: '/images/challenges.png',
      title: 'Challenges',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
    }
  ];

  const faqs = [
    {
      title: 'Offer 1:1 Sessions',
      descritption: 'Mentorship sessions, consultations, discovery calls - do what you do best. We take care of everything else'
    },
    {
      title: 'Host Webinar',
      descritption: 'Mentorship sessions, consultations, discovery calls - do what you do best. We take care of everything else'
    },
    {
      title: 'Sell Courses & Products',
      descritption: 'Mentorship sessions, consultations, discovery calls - do what you do best. We take care of everything else'
    },
    {
      title: 'Earn money with Meetings',
      descritption: 'Mentorship sessions, consultations, discovery calls - do what you do best. We take care of everything else'
    },
    {
      title: 'Lorem Ipsum sit amet dollar',
      descritption: 'Mentorship sessions, consultations, discovery calls - do what you do best. We take care of everything else'
    },
    {
      title: 'PAS Lorem Ipsum sit amet dollar ',
      descritption: 'Mentorship sessions, consultations, discovery calls - do what you do best. We take care of everything else'
    }
  ];

  return (
    <main className="font-plus-jakarta-sans">
      {/* Desktop */}
      <HomeBanner />
      <SupportSection />
      <ProfessionalsSection />
      <section className="px-4 md:px-7 lg:px-10 pt-[50px] pb-10 bg-[#F9FCFF] dark:bg-[#181C28] bg-[url('/images/upcomming-events-bg.png')] bg-cover bg-center">
        <h5 className="text-2xl/[51px] font-bold capitalize">Upcoming Webinars</h5>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5">
          {events.map((event) => (
            <div key={event.id} className="rounded-[18px] shadow-[0px_8px_30px_0px_rgba(80_85_136_0.06)] py-2 px-3 bg-background">
              <div className="relative">
                <Image src={event.image} alt={event.title} width={287} height={131} className="max-h-[131] w-full rounded-[10px]" />
                <div className="py-1.5 px-3.5 flex flex-col items-center justify-center flex-shrink-0 text-[#F0635A] text-[10px] font-medium rounded-[10px] bg-white/70 absolute top-2 left-2.5">
                  <p>10</p>
                  <p>JUNE</p>
                </div>
              </div>
              <p className="text-sm font-semibold leading-normal mt-[14px]">{event.title}</p>
              <p className="text-xs/[19px] tracking-[0.06px] text-[#384853] dark:text-[#A8B4C0]/90 mt-1.5">{event.description}</p>
              <div className="mt-[22px] flex flex-col gap-[9px]">
                <div className="flex gap-[5px] items-start">
                  <Image src={'/images/map-pin.svg'} height={16} width={16} alt="Map pin icon" className="flex-shrink-0" />
                  <p className="text-xs leading-normal text-[#2B2849] dark:text-[#A8A4C8]">{event.location}</p>
                </div>
                <div className="flex gap-[5px] items-start">
                  <Image src={'/images/map-pin.svg'} height={16} width={16} alt="Map pin icon" className="flex-shrink-0" />
                  <div className="text-xs leading-normal text-[#2B2849] dark:text-[#A8A4C8]">
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                  </div>
                </div>
              </div>
              <AvatarGroup users={event.participants} max={2} />
              <div className="bg-[#FFF7DF] py-[7px] px-2.5 flex justify-between rounded-[8px]">
                <div>
                  <p className="text-[#6B7B8A] text-[9px]/[12px]">Host</p>
                  <p className="text-[#384853] text-[10px] font-bold leading-[14px]">{event.host}</p>
                </div>
                <Link href={'/'} className="flex items-center justify-center p-2 bg-[#E3F0FD] rounded-full">
                  <Image src={'/images/link-icon.svg'} alt="Link Icon" width={16} height={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="px-4 md:px-7 lg:px-10 pt-[50px] pb-10 bg-[#F9FCFF] dark:bg-[#181C28] bg-[url('/images/upcomming-events-bg.png')] bg-cover bg-center">
        <h5 className="text-2xl/[51px] font-bold capitalize">Upcoming Events</h5>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5">
          {events.map((event) => (
            <div key={event.id} className="rounded-[18px] shadow-[0px_8px_30px_0px_rgba(80_85_136_0.06)] py-2 px-3 bg-background">
              <div className="relative">
                <Image src={event.image} alt={event.title} width={287} height={131} className="max-h-[131] w-full rounded-[10px]" />
                <div className="py-1.5 px-3.5 flex flex-col items-center justify-center flex-shrink-0 text-[#F0635A] text-[10px] font-medium rounded-[10px] bg-white/70 absolute top-2 left-2.5">
                  <p>10</p>
                  <p>JUNE</p>
                </div>
              </div>
              <p className="text-sm font-semibold leading-normal mt-[14px]">{event.title}</p>
              <p className="text-xs/[19px] tracking-[0.06px] text-[#384853] dark:text-[#A8B4C0]/90 mt-1.5">{event.description}</p>
              <div className="mt-[22px] flex flex-col gap-[9px]">
                <div className="flex gap-[5px] items-start">
                  <Image src={'/images/map-pin.svg'} height={16} width={16} alt="Map pin icon" className="flex-shrink-0" />
                  <p className="text-xs leading-normal text-[#2B2849] dark:text-[#A8A4C8]">{event.location}</p>
                </div>
                <div className="flex gap-[5px] items-start">
                  <Image src={'/images/map-pin.svg'} height={16} width={16} alt="Map pin icon" className="flex-shrink-0" />
                  <div className="text-xs leading-normal text-[#2B2849] dark:text-[#A8A4C8]">
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                  </div>
                </div>
              </div>
              <AvatarGroup users={event.participants} max={2} />
              <div className="bg-[#FFF7DF] py-[7px] px-2.5 flex justify-between rounded-[8px]">
                <div>
                  <p className="text-[#6B7B8A] text-[9px]/[12px]">Host</p>
                  <p className="text-[#384853] text-[10px] font-bold leading-[14px]">{event.host}</p>
                </div>
                <Link href={'/'} className="flex items-center justify-center p-2 bg-[#E3F0FD] rounded-full">
                  <Image src={'/images/link-icon.svg'} alt="Link Icon" width={16} height={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="pt-16">
        <h4 className="px-4 md:px-7 lg:px-10 text-center text-[56px]/[130%] font-semibold tracking-[-1.12px]">Our clients knows the value we provide</h4>
        <p className="max-w-[624px] mx-auto mt-4 mb-[70px]  text-center text-lg/[150%]">We take great pride in the satisfaction of our clients, as evidenced by their glowing feedback about our exceptional service.</p>
        <Marquee>
        <div className="flex gap-12 ml-12">
          {reviews.map((review, index) => (
            <div key={index} className="p-10 bg-review-card flex-shrink-0 rounded-[20px] flex flex-col gap-7">
              <div className="flex gap-5">
                <Avatar className='h-10 w-10'>
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback className='bg-[#E3E6EA] dark:bg-muted-foreground'>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xl/[130%] font-roboto font-bold tracking-[-1px]">{review.name}</p>
                  <p className="text-sm text-[#7E8492]">{review.name}</p>
                </div>
              </div>
              <p className="max-w-[391px] font-inter text-base/[26px] font-medium">{review.message}</p>
              <div className="flex gap-1.5">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="h-5 w-5 fill-[#FBBC05] text-[#FBBC05]" />
                ))}
              </div>
            </div>
          ))}
          </div>
        </Marquee>
        <Marquee
          direction="right"
          className="mt-12 mb-[86px]"
        >
          <div className="flex gap-12 mr-12">
            {reviews.map((review, index) => (
              <div key={index} className="p-10 bg-review-card flex-shrink-0 rounded-[20px] flex flex-col gap-7">
                <div className="flex gap-5">
                  <Avatar className='h-10 w-10'>
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback className='bg-[#E3E6EA] dark:bg-muted-foreground'>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xl/[130%] font-roboto font-bold tracking-[-1px]">{review.name}</p>
                    <p className="text-sm text-[#7E8492]">{review.name}</p>
                  </div>
                </div>
                <p className="max-w-[391px] font-inter text-base/[26px] font-medium">{review.message}</p>
                <div className="flex gap-1.5">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} className="h-5 w-5 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </section>
      <section className="px-4 md:px-7 lg:px-10 bg-primary-light pt-[130px] pb-[99px]">
        <h5 className="text-center font-poppins text-[40px] font-semibold leading-[140%]">All the tools. One platform.</h5>
        <p className="text-center text-base font-medium leading-[32px] mb-[78px]">Lorem ipsu Lorem ipsu Lorem ipsu Lorem ipsu Lorem ipsu Lorem ipsu Lorem ipsu </p>
        <div className="flex flex-wrap justify-between gap-6">
          {platforms.map((platform) => (
            <div key={platform.title} className="flex flex-col items-center w-full max-w-[290px]">
              <Image src={platform.image} width={100} height={100} alt={platform.title} />
              <p className="text-center font-poppins font-semibold text-[140%] text-xl mt-6">{platform.title}</p>
              <p className="text-[#7E8492] dark:text-[#BFC8D1] text-center font-medium text-base/[32px] mt-12">{platform.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-28 px-4 md:px-7 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-[104px]">
        <div>
          <h5 className="font-semibold text-2xl/7 md:text-5xl/[116%] lg:text-[56px]/[72px] tracking-[-2%]">What you can do by joining as an Expert</h5>
          <p className="text-[#7E8492] font-medium text-sm md:text-base lg:text-lg/8 mt-2.5 md:mt-4">Elevate Your Website Design Game with Coco Intuitive Features and Beautiful Templates</p>
          <Button className="text-white text-xs md:text-sm lg:text-base/[26px] py-[14px] px-5 h-fit rounded-full mt-8 md:mt-14">Join as Expert</Button>
        </div>
          <Accordion className="" type="single" collapsible>
          {
            faqs.map((faq) => (
              <AccordionItem key={faq.title} className="pb-7 mb-7" value={faq.title}>
                <AccordionTrigger className="font-semibold text-2xl/8 tracking-[-1%] text-left">{faq.title}</AccordionTrigger>
                <AccordionContent className="text-[#7E8492] pb-0 mt-4 font-medium text-lg/8">
                 {faq.descritption}
                </AccordionContent>
              </AccordionItem>
            ))
           }
          </Accordion>
      </section>
      <section className="py-28 px-4 md:px-7 lg:px-10 pt-[50px] pb-[103px]">
        <h6 className="text-4xl/[46px] font-semibold tracking-[-2%]">Connect with Top Experts for Personalised Advice</h6>
        <div className="flex gap-8 flex-wrap items-center mt-12">
          <Button className="text-white text-xs md:text-sm lg:text-base/[26px] py-3 px-4 h-fit rounded-full">Find an Expert</Button>
          <Button variant='outline' className="text-xs md:text-sm lg:text-base/[26px] py-3 px-4 h-fit rounded-full border-foreground">Book a Video Call</Button>
          <Button variant='outline' className="text-xs md:text-sm lg:text-base/[26px] py-3 px-4 h-fit rounded-full border-foreground">Virtual Consultation</Button>
        </div>
        <div className="flex gap-[108px] items-center mt-[104px]">
          <div className="max-w-[515px]">
            <h6 className="font-semibold text-[32px]/10 tracking-[-1%]">Find an Expert</h6>
            <p className="mt-4 text-[#7E8492] dark:text-[#BFC8D1]">
              Explore and choose from a curated selection of the world’s most sought-after experts, each renowned for their specialized skills. Connect with the top professionals to gain valuable insights and drive success in your projects.
            </p>
          </div>
          <Image src={'/images/connect-section.png'} alt="" width={584} height={366} />
        </div>
      </section>



      {/* mobile */}
      <section className="block md:hidden">
        <div className="bg-[url('/images/home-banner-mobile-bg.png')] bg-cover bg-center pt-7 pb-4 px-5 rounded-2xl">
          <h1 className="max-w-[231px] text-xs font-medium text-white">
            Here , Are you want to earn from your expertise, Let&apos;s setup your expert profile
          </h1>
          <Button className="bg-white hover:bg-white/90 mt-3 text-primary font-medium text-xs px-4 py-2 h-fit">Became Expert</Button>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar mt-5">
          {
            Array.from({ length: 10 }, (_, idx) => (
              <Avatar key={idx} className='h-14 w-14'>
                <AvatarImage src="" />
                <AvatarFallback className='bg-[#E3E6EA] dark:bg-muted-foreground'>CN</AvatarFallback>
              </Avatar>
            ))
          }
        </div>
      </section>
    </main>
  );
}
