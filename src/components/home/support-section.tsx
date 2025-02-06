import Image from 'next/image'
import React from 'react'

export default function SupportSection() {
    const supportItem = [
        {
            icon: '/images/chat-icon.png',
            title: 'Seamless entry to the world’s best.',
            paragraph: 'Lorem ipsum dolor sit amet consectetur. Aenean fermentum lorem sagittis duis consequat. In phasellus.'
        },
        {
            icon: '/images/head-phone-icon.png',
            title: 'Tailored advice to accelerate your success.',
            paragraph: 'Lorem ipsum dolor sit amet consectetur. Aenean fermentum lorem sagittis duis consequat. In phasellus.'
        },
        {
            icon: '/images/send-icon.png',
            title: 'Reach your long-term goals with ease.',
            paragraph: 'Lorem ipsum dolor sit amet consectetur. Aenean fermentum lorem sagittis duis consequat. In phasellus.'
        }
    ];
  return (
      <section className="px-4 md:px-7 lg:px-10 bg-[url('/images/customer-support.png')] bg-cover bg-center pt-[92px] pb-[60px]">
          <div className="flex flex-col gap-14 max-w-[872px]">
              <h3 className="text-white text-[56px]/[67px]">
                  Simple methods to provide Lorem support
              </h3>
              {
                  supportItem.map((item) => (
                      <div key={item.title} className="grid grid-cols-2 gap-7">
                          <div className="flex items-start gap-10">
                              <Image src={item.icon} height={72} width={72} alt="Message Icon" className="flex-shrink-0" />
                              <p className="text-subtle-foreground text-[32px]/[115%]">{item.title}</p>
                          </div>
                          <p className="text-subtle-foreground text-lg/8 font-medium">
                              {item.paragraph}
                          </p>
                      </div>
                  ))
              }

          </div>
      </section>
  )
}
