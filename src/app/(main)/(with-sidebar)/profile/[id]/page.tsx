import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import React from 'react'

export default function page() {

    const items = [
        {
            icon: '/images/user-icon.svg',
            title: 'Personal Informations',
            value: 'personal-information'
        },
        {
            icon: '/images/meeting-icon.svg',
            title: 'Add Meetings',
            vlue: ''
        },
        {
            icon: '/images/programs-icon.svg',
            title: 'Program & Resources'
        },
        {
            icon: '/images/language-icon.svg',
            title: 'Preffered Language'
        },
        {
            icon: '/images/time-zone-icon.svg',
            title: 'Timezone'
        },
        {
            icon: '/images/security-icon.svg',
            title: 'Security'
        },
    ]
  return (
      <div className="flex-grow pr-[35px] max-w-[calc(100%-103.45px)]">
          <Tabs defaultValue="account" className="flex">
              <TabsList className='flex-col py-4 h-full bg-background rounded-none justify-start items-start'>
                  {
                      items.map((item) => (
                          <TabsTrigger key={item.title} className='w-full px-4 py-3 flex justify-start gap-4 bg-[#FAFAFA] !shadow-none' value="account">
                              <div className='flex justify-center items-center p-3 rounded-full h-12 w-12'>
                                  <Image src={item.icon} width={24} height={24} alt={item.title} className='object-cover object-center' />
                              </div>
                              <p className=''>{item.title}</p>
                          </TabsTrigger>
                    ))
                  }

                  <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Make changes to your account here.</TabsContent>
              <TabsContent value="password">Change your password here.</TabsContent>
          </Tabs>
        </div>
  )
}
