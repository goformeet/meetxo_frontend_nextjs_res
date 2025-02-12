import Image from 'next/image';
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    // CarouselNext,
    // CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'


export default function ToolsSection() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])
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
  return (
      <section className="px-4 md:px-7 lg:px-10 bg-primary-light pt-[130px] pb-[99px]">
          <h5 className="text-center font-poppins text-[40px] font-semibold leading-[140%]">All the tools. One platform.</h5>
          <p className="text-center text-base font-medium leading-[32px] mb-[78px]">Lorem ipsu Lorem ipsu Lorem ipsu Lorem ipsu Lorem ipsu Lorem ipsu Lorem ipsu </p>
              <Carousel
                  plugins={[
                      Autoplay({
                          delay: 2000
                      })
                  ]}
                  opts={{
                      align: "start",
                      loop: true
                  }}
                  className=""
              >
                  <CarouselContent className="basis-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                      {platforms.map((platform) => (
                          <CarouselItem key={platform.title} className="flex flex-col items-center w-full md:max-w-[290px]">
                              <Image src={platform.image} width={100} height={100} alt={platform.title} />
                              <p className="text-center font-poppins font-semibold text-[140%] text-xl mt-6">{platform.title}</p>
                              <p className="text-[#7E8492] dark:text-[#BFC8D1] text-center font-medium text-base/[32px] mt-12">{platform.description}</p>
                          </CarouselItem>
                      ))}
                  </CarouselContent>
                  {/* <CarouselPrevious />
                  <CarouselNext /> */}
              </Carousel>
      </section>
  )
}
