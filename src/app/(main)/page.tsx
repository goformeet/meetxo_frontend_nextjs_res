'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from "lucide-react";
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
import EventCard from "@/components/event-card";
import ReviewCard from "@/components/review-card";
import Footer from "@/components/global/layout/footer";




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
      title: 'Live Sessions & Workshops',
      description: 'Host real-time webinars, workshops, and group coaching sessions, enabling you to connect and interact with your audience while sharing your expertise.'
    },
    {
      image: '/images/whats-app.png',
      title: 'Integrated Payments',
      description: 'Easily handle payments for subscriptions, one-time purchases, and tips through secure and seamless payment processing, so you can focus on delivering value.'
    },
    {
      image: '/images/courses.png',
      title: 'Personal Branding',
      description: 'Fully customize your profile and storefront on MeetXO to reflect your personal brand, making it easier for your audience to recognize and connect with you.'
    },
    {
      image: '/images/challenges.png',
      title: 'Expert Profile Creation',
      description: 'Create a professional profile to showcase your expertise, experience, and unique offerings, attracting potential clients and building your reputation.'
    },
    {
      image: '/images/challenges.png',
      title: 'On-Demand Consultations',
      description: 'Set your availability and let users book one-on-one consultations with you, empowering you to deliver personalized guidance to those who need it.'
    },
    {
      image: '/images/challenges.png',
      title: '1:1 Consultations',
      description: 'Offer personalized, one-on-one consultations to your audience, where they can receive tailored advice and insights directly from you.'
    },
    {
      image: '/images/challenges.png',
      title: 'Event Hosting & Meetups',
      description: 'Organize and host virtual events, meetups, and networking sessions for your audience, fostering connections and expanding your reach.'
    },
  ];

  const faqs = [
    {
      title: 'How do I become an expert on MeetXO?',
      descritption: "To become an expert, simply sign up through the 'Join as Expert' button on the homepage, create your profile, and start offering services such as 1:1 consultations, webinars, and mentorship. It's quick and easy!"
    },
    {
      title: 'What types of services can I offer on MeetXO?',
      descritption: "As an expert, you can offer a range of services, including one-on-one consultations, workshops, webinars, courses, and even sell digital products. Whether you’re a mentor, consultant, or educator, MeetXO has everything you need to share your knowledge"
    },
    {
      title: 'How do users book sessions with experts?',
      descritption: 'Users can browse through expert profiles, choose the service they need, and book sessions directly through the platform. The booking process is simple and secure, ensuring both experts and users have a smooth experience.'
    },
    {
      title: 'What payment methods are supported?',
      descritption: 'MeetXO provides integrated payment solutions, supporting secure payments for 1:1 sessions, courses, and other services. We accept multiple payment methods for your convenience, and payments are processed automatically.'
    },
    {
      title: 'What makes MeetXO different from other platforms?',
      descritption: 'MeetXO is designed to bring experts and users together in one place. We offer everything from easy profile setup, seamless booking systems, secure payments, to live sessions—all in a single platform. It’s made to help both experts grow their businesses and users find the right guidance efficiently.'
    }
  ];

  return (
    <>
    <main className="font-plus-jakarta-sans">
      {/* Desktop */}
      <HomeBanner />
      <SupportSection />
      <ProfessionalsSection />
      {/* <section className="px-4 md:px-7 lg:px-10 pt-[50px] pb-10 bg-[#F9FCFF] dark:bg-[#181C28] bg-[url('/images/upcomming-events-bg.png')] bg-cover bg-center">
        <h5 className="text-2xl/[51px] font-bold capitalize">Upcoming Webinars</h5>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
      <section className="px-4 md:px-7 lg:px-10 pt-[50px] pb-10 bg-[#F9FCFF] dark:bg-[#181C28] bg-[url('/images/upcomming-events-bg.png')] bg-cover bg-center">
        <h5 className="text-2xl/[51px] font-bold capitalize">Upcoming Events</h5>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section> */}
      <section className="pt-16">
          <h4 className="px-4 md:px-7 lg:px-10 text-center text-[56px]/[130%] font-semibold tracking-[-1.12px]">Our Clients Know the Value We Deliver</h4>
          <p className="max-w-[624px] mx-auto mt-4 mb-[70px] text-center text-lg/[150%]">We don’t just meet expectations—we redefine them. Here’s what industry leaders say about working with us.</p>
        <Marquee>
        <div className="flex gap-12 ml-12">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
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
                    <AvatarImage src={review.avatar}  className="object-cover object-center"/>
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
            <div key={platform.title} className="flex flex-col items-center w-full md:max-w-[290px]">
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
        <div className="flex gap-4 md:gap-8 flex-wrap items-center mt-12">
          <Button className="text-white text-xs md:text-sm lg:text-base/[26px] py-3 px-4 h-fit rounded-full">Find an Expert</Button>
          <Button variant='outline' className="text-xs md:text-sm lg:text-base/[26px] py-3 px-4 h-fit rounded-full border-foreground">Book a Video Call</Button>
          <Button variant='outline' className="text-xs md:text-sm lg:text-base/[26px] py-3 px-4 h-fit rounded-full border-foreground">Virtual Consultation</Button>
        </div>
        <div className="flex flex-col md:flex-row gap-14 md:gap-[108px] items-center mt-[104px]">
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
      <Footer />
    </>

  );
}
