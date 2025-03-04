'use client';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Star } from "lucide-react";
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
// import EventCard from "@/components/event-card";
import ReviewCard from "@/components/review-card";
// import Footer from "@/components/global/layout/footer";
import ConnectWithTopExpertsSection from "@/components/home/connect-with-top-experts-section";
import ToolsSection from "@/components/home/tools-section";
import EventCard from "@/components/event-card";
import { useEffect, useState } from "react";
import { getAllEvents } from "@/services/api";
import JoinAsExpert from "@/components/home/join-as-expert";
import { Button } from "@/components/ui/button";
import Link from "next/link";


type EventType = {
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

export default function Home() {
  const [events, setEvents] = useState<EventType[]>([]);
  const token = localStorage.getItem('token')



  const reviews = [
    {
      avatar: '/images/socrates.jpg',
      name: 'Socrates',
      profession: 'Philosopher',
      message: 'The best conversations spark growth—true wisdom comes from exchanging ideas with those who challenge and inspire us.'
    },
    {
      avatar: '/images/Ralphwaldoemerson.jpg',
      name: 'Ralph Waldo Emerson',
      profession: 'American essayist',
      message: 'Your greatest asset is your network—each meeting is a step toward new opportunities, insights, and lasting impact.'
    },
    {
      avatar: '/images/seneca.jpg',
      name: 'Seneca',
      profession: 'Stoic philosopher',
      message: 'To teach is to learn twice—sharing your expertise strengthens both the mentor and the mentee.'
    },
    {
      avatar: '/images/aristotle .jpg',
      name: 'Aristotle',
      profession: 'Greek philosopher and polymath',
      message: 'Mastery is not achieved alone; it flourishes in the company of experts, mentors, and seekers of knowledge.'
    },
    {
      avatar: '/images/confucius.jpg',
      name: 'Confucius',
      profession: 'philosopher',
      message: 'A single connection can open a thousand doors—great knowledge is built through shared experiences and meaningful dialogue.'
    },
    {
      avatar: '/images/osho.jpg',
      name: 'Osho',
      profession: 'Indian philosopher',
      message: 'The sharing of wisdom is the greatest joy. When you give your knowledge, it multiplies—true intelligence grows in connection.'
    },
  ];



  // const events = [
  //   {
  //     id: 1,
  //     title: 'Masterclass for empowering with AI for 2025',
  //     description: 'Masterclass for empowering with AI for job securing',
  //     image: '/images/event-item.png',
  //     location: '36 Guild Street London, UK ',
  //     date: 'Wed, 1 Jan`25',
  //     time: '20:30 - 21:30 GMT+05:30',
  //     host: 'Pratiksha Chavhan',
  //     url: '/',
  //     participants: [
  //       {
  //         id: 1,
  //         name: 'Savannah Nguyen',
  //         avatar: '/images/avatar.svg'
  //       },
  //       {
  //         id: 2,
  //         name: 'Savannah Nguyen',
  //         avatar: '/images/avatar.svg'
  //       },
  //       {
  //         id: 3,
  //         name: 'Savannah Nguyen',
  //         avatar: '/images/avatar.svg'
  //       },
  //     ]
  //   },
  //   {
  //     id: 2,
  //     title: 'Masterclass for empowering with AI for 2025',
  //     description: 'Masterclass for empowering with AI for job securing',
  //     image: '/images/event-item.png',
  //     location: '36 Guild Street London, UK ',
  //     date: 'Wed, 1 Jan`25',
  //     time: '20:30 - 21:30 GMT+05:30',
  //     host: 'Pratiksha Chavhan',
  //     url: '/',
  //     participants: [
  //       {
  //         id: 1,
  //         name: 'Savannah Nguyen',
  //         avatar: '/images/avatar.svg'
  //       },
  //       {
  //         id: 2,
  //         name: 'Savannah Nguyen',
  //         avatar: '/images/avatar.svg'
  //       },
  //       {
  //         id: 3,
  //         name: 'Savannah Nguyen',
  //         avatar: '/images/avatar.svg'
  //       },
  //     ]
  //   },
  //   {
  //     id: 3,
  //     title: 'Masterclass for empowering with AI for 2025',
  //     description: 'Masterclass for empowering with AI for job securing',
  //     image: '/images/event-item.png',
  //     location: '36 Guild Street London, UK ',
  //     date: 'Wed, 1 Jan`25',
  //     time: '20:30 - 21:30 GMT+05:30',
  //     host: 'Pratiksha Chavhan',
  //     url: '/',
  //     participants: [
  //       {
  //         id: 1,
  //         name: 'Savannah Nguyen',
  //         avatar: '/images/avatar.svg'
  //       },
  //       {
  //         id: 2,
  //         name: 'Savannah Nguyen',
  //         avatar: '/images/avatar.svg'
  //       },
  //       {
  //         id: 3,
  //         name: 'Savannah Nguyen',
  //         avatar: '/images/avatar.svg'
  //       },
  //     ]
  //   },
  //   {
  //     id: 4,
  //     title: 'Masterclass for empowering with AI for 2025',
  //     description: 'Masterclass for empowering with AI for job securing',
  //     image: '/images/event-item.png',
  //     location: '36 Guild Street London, UK ',
  //     date: 'Wed, 1 Jan`25',
  //     time: '20:30 - 21:30 GMT+05:30',
  //     host: 'Pratiksha Chavhan',
  //     url: '/',
  //     participants: [
  //       {
  //         id: 1,
  //         name: 'Savannah Nguyen',
  //         avatar: '/images/avatar.svg'
  //       },
  //       {
  //         id: 2,
  //         name: 'Savannah Nguyen',
  //         avatar: '/images/avatar.svg'
  //       },
  //       {
  //         id: 3,
  //         name: 'Savannah Nguyen',
  //         avatar: '/images/avatar.svg'
  //       },
  //     ]
  //   },
  //   {
  //     id: 5,
  //     title: 'Masterclass for empowering with AI for 2025',
  //     description: 'Masterclass for empowering with AI for job securing',
  //     image: '/images/event-item.png',
  //     location: '36 Guild Street London, UK ',
  //     date: 'Wed, 1 Jan`25',
  //     time: '20:30 - 21:30 GMT+05:30',
  //     host: 'Pratiksha Chavhan',
  //     url: '/',
  //     participants: [
  //       {
  //         id: 1,
  //         name: 'Savannah Nguyen',
  //         avatar: '/images/avatar.svg'
  //       },
  //       {
  //         id: 2,
  //         name: 'Savannah Nguyen',
  //         avatar: '/images/avatar.svg'
  //       },
  //       {
  //         id: 3,
  //         name: 'Savannah Nguyen',
  //         avatar: '/images/avatar.svg'
  //       },
  //     ]
  //   },
  // ];



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
  const getEvents = async () => {
    try {
      const res = await getAllEvents()
      if (res.success) {
        setEvents(res.data);
      }
    } catch (error) {
      console.error(error)

    }
  }
  useEffect(() => {
    getEvents()
  }, [])

  return (
    <>
      <main className="font-plus-jakarta-sans">
        {/* Desktop */}
        {
          !token && <><HomeBanner />
            <SupportSection /></>
        }
        <ProfessionalsSection />
        {/* <section className="px-4 md:px-7 lg:px-10 pt-[50px] pb-10 bg-[#F9FCFF] dark:bg-[#181C28] bg-[url('/images/upcomming-events-bg.png')] bg-cover bg-center">
        <h5 className="text-2xl/[51px] font-bold capitalize">Upcoming Webinars</h5>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section> */}
        {events.length > 0 && (
          <section className="px-4 md:px-7 lg:px-10 pt-[50px] pb-10 bg-[#F9FCFF] dark:bg-[#181C28] bg-[url('/images/upcomming-events-bg.png')] bg-cover bg-center">
            <h5 className="text-2xl/[51px] font-bold capitalize">
              Upcoming Events
            </h5>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
            <div className="flex justify-center mt-8 md:mt-16">
              <Button className="text-white text-sm md:text-lg/[150%] font-semibold py-3 md:py-[18px] px-4 md:px-7 rounded md:rounded-[14px] h-fit">
                <Link href={"/events"}>Explore Events</Link>
              </Button>
            </div>
          </section>
        )}

        <section className="pt-7 md:pt-16">
          <h4 className="px-4 md:px-7 lg:px-10 text-center text-2xl md:text-[56px]/[130%] font-semibold tracking-[-1.12px]">
            Scholars know the value of meeting the right people
          </h4>
          <p className="max-w-[624px] mx-auto mt-4 mb-8 md:mb-[70px] text-center text-base md:text-lg/[150%]">
            We don’t just meet expectations—we redefine them. Here’s what the
            philosopher says..
          </p>
          <Marquee>
            <div className="flex gap-6 md:gap-12 ml-12">
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          </Marquee>
          <Marquee
            direction="right"
            className="mt-6 md:mt-12 mb-10 md:mb-[86px]"
          >
            <div className="flex gap-6 md:gap-12 mr-12">
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          </Marquee>
        </section>
        <ToolsSection />
        <section className="py-14 md:py-28 px-4 md:px-7 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-[104px]">
          <div>
            <h5 className="font-semibold text-2xl/7 md:text-5xl/[116%] lg:text-[56px]/[72px] tracking-[-2%]">
              What you can do by joining as an Expert
            </h5>
            <p className="text-[#7E8492] font-medium text-sm md:text-base lg:text-lg/8 mt-2.5 md:mt-4">
              Share Your Expertise. Build Your Brand. Earn Effortlessly.
            </p>
            <JoinAsExpert />
          </div>
          <Accordion className="" type="single" collapsible>
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.title}
                className="pb-7 mb-7"
                value={faq.title}
              >
                <AccordionTrigger className="font-semibold text-base md:text-2xl/8 tracking-[-1%] text-left">
                  {faq.title}
                </AccordionTrigger>
                <AccordionContent className="text-[#7E8492] pb-0 mt-4 font-medium text-sm md:text-lg/8">
                  {faq.descritption}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <ConnectWithTopExpertsSection />

        {/* mobile */}
        {/* <section className="block md:hidden">
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
      </section> */}
      </main>
      {/* <Footer /> */}
    </>
  );
}
