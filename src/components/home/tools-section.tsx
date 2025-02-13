import Image from 'next/image';
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'


export default function ToolsSection() {
      const platforms = [
        {
          image: '/images/Live Sessions & Workshops.png',
          title: 'Live Sessions & Workshops',
          description: 'Host real-time webinars, workshops, and group coaching sessions, enabling you to connect and interact with your audience while sharing your expertise.'
        },
        {
          image: '/images/Integrated Payments.png',
          title: 'Integrated Payments',
          description: 'Easily handle payments for subscriptions, one-time purchases, and tips through secure and seamless payment processing, so you can focus on delivering value.'
        },
        {
          image: '/images/Personal Branding.png',
          title: 'Personal Branding',
          description: 'Fully customize your profile and storefront on MeetXO to reflect your personal brand, making it easier for your audience to recognize and connect with you.'
        },
        {
          image: '/images/expert profile creation.png',
          title: 'Expert Profile Creation',
          description: 'Create a professional profile to showcase your expertise, experience, and unique offerings, attracting potential clients and building your reputation.'
        },
        {
          image: '/images/On-Demand Consultations.png',
          title: 'On-Demand Consultations',
          description: 'Set your availability and let users book one-on-one consultations with you, empowering you to deliver personalized guidance to those who need it.'
        },
        {
          image: '/images/1;1 Consultations.png',
          title: '1:1 Consultations',
          description: 'Offer personalized, one-on-one consultations to your audience, where they can receive tailored advice and insights directly from you.'
        },
        {
          image: '/images/Event Hosting & Meetups.png',
          title: 'Event Hosting & Meetups',
          description: 'Organize and host virtual events, meetups, and networking sessions for your audience, fostering connections and expanding your reach.'
        },
      ];
  return (
      <section className="px-4 md:px-7 lg:px-10 bg-primary-light pt-16 md:pt-[130px] pb-10 md:pb-[99px]">
          <h5 className="text-center font-poppins text-2xl md:text-[40px] font-semibold leading-[140%]">All the tools. One platform.</h5>
          <p className="text-center text-sm md:text-base font-medium leading-[32px] mb-9 md:mb-[78px]">Your Gateway to Expert Guidance & Growth.</p>
              <Carousel
                  plugins={[
                      Autoplay({
                          delay: 5000
                      })
                  ]}
                  opts={{
                      align: "start",
                      loop: true
                  }}
                  className="relative"
              >
                  <CarouselContent className="basis-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                      {platforms.map((platform) => (
                          <CarouselItem key={platform.title} className="flex flex-col items-center w-full md:max-w-[297px]">
                              <Image src={platform.image} width={1080} height={1080} alt={platform.title} className='h-[100px] w-[104px]' />
                              <p className="text-center font-poppins font-semibold text-[140%] text-xl mt-6">{platform.title}</p>
                              <p className="text-[#7E8492] dark:text-[#BFC8D1] text-center font-medium text-base/[32px] mt-1">{platform.description}</p>
                          </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious className='left-0 md:left-2' />
                  <CarouselNext className='right-0 md:right-2' /> 
              </Carousel>
      </section>
  )
}
