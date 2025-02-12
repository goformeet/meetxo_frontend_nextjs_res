import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

export default function page() {
  return (
      <div className="flex-grow pr-[35px] max-w-[calc(100%-103.45px)]">
          <Tabs defaultValue="account" className="flex">
              <TabsList className='flex-col py-4 h-full bg-background rounded-none justify-start items-start'>
                  <TabsTrigger className='w-full px-4 flex gap-4 bg-[#FAFAFA]' value="account">
                      
                  </TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Make changes to your account here.</TabsContent>
              <TabsContent value="password">Change your password here.</TabsContent>
          </Tabs>
        </div>
  )
}
