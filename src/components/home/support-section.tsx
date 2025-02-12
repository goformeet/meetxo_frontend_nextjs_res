import Image from 'next/image'
import React from 'react'

export default function SupportSection() {
    const supportItem = [
        {
            icon: '/images/chat-icon.png',
            title: 'Personalized Expert Profile.',
            paragraph: 'Your name, your brand. Get a unique MeetXO profile that showcases your expertise, experience, and availability—all in one place.'
        },
        {
            icon: '/images/head-phone-icon.png',
            title: 'Seamless Booking & Payments',
            paragraph: 'No hassle, no back-and-forth. Clients can book sessions instantly, and payments are securely processed through MeetXO.'
        },
        {
            icon: '/images/send-icon.png',
            title: 'Global Visibility & Growth.',
            paragraph: 'Expand your reach beyond borders. Connect with individuals and businesses worldwide looking for your expertise.'
        }
    ];
  return (
      <section className="px-4 md:px-7 lg:px-10 bg-[url('/images/customer-support.png')] bg-cover bg-center pt-[92px] pb-[60px]">
          <div className="flex flex-col gap-14 max-w-[872px]">
              <h3 className="text-white text-3xl md:text-[56px]/[67px]">
                  Why Experts Love MeetXO for Growth and Success
              </h3>
              {
                  supportItem.map((item) => (
                      <div key={item.title} className="grid grid-cols-1 md:grid-cols-2 gap-7">
                          <div className="flex flex-col md:flex-row items-start gap-10">
                              <Image src={item.icon} height={72} width={72} alt="Message Icon" className="flex-shrink-0" />
                              <p className="text-subtle-foreground text-xl md:text-[32px]/[115%]">{item.title}</p>
                          </div>
                          <p className="text-subtle-foreground text-base md:text-lg/8 font-medium">
                              {item.paragraph}
                          </p>
                      </div>
                  ))
              }

          </div>
      </section>
  )
}
