import ProfileInformationForm from '@/components/profile/profile-information-form'
import ProfileServices from '@/components/profile/profile-services'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
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
            title: 'Add Services',
            value: 'add-services'
        },
        {
            icon: '/images/calander-icon.svg',
            title: 'Calander',
            value: 'calander'
        },
        {
            icon: '/images/description-icon.svg',
            title: 'Protfolio',
            value: 'protfolio'
        },
    ]
  return (
      <div className="flex-1">
          <Tabs defaultValue="personal-information" className="flex gap-4 flex-1">
              <TabsList className='flex-col py-4 h-full bg-background rounded-none justify-start items-start border-r border-[#F1F2F4]'>
                  {
                      items.map((item) => (
                          <TabsTrigger key={item.title} className={cn('w-full px-4 py-3 flex justify-start gap-4 !shadow-none data-[state=active]:bg-[#FAFAFA]')} value={item.value}>
                              <div className='flex justify-center items-center p-3 rounded-full h-12 w-12 bg-[#FAFAFA]'>
                                  <Image src={item.icon} width={24} height={24} alt={item.title} className='object-contain object-center h-6 w-6' />
                              </div>
                              <p className='font-semibold text-foreground'>{item.title}</p>
                          </TabsTrigger>
                    ))
                  }
              </TabsList>
              <TabsContent className='flex-1 py-2 px-2' value="personal-information">
                  <ProfileInformationForm />
              </TabsContent>
              <TabsContent className='flex-1 py-2 px-2' value="add-services">
                  <ProfileServices />
              </TabsContent>
          </Tabs>
        </div>
  )
}
