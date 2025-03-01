'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import EmptyServices from '../empty-services';
import ProfileServiceForm from './profile-service-from';

export default function ProfileServices() {
    const [category, setCategory] = useState("1:1 Call");

    const categories = [
        { id: 2, name: "1:1 Call" },
        { id: 3, name: "Events" },
        { id: 4, name: "Digital Product" }
    ];
  return (
      <div className=''>
          <p className="text-xl font-bold pb-4 border-b border-[#F1F2F4]">
              Services
          </p>
          <div className='flex gap-3 my-3'>
              {categories.map((categ) => (
                  <Button
                      variant={"outline"}
                      key={categ.id}
                      onClick={() => setCategory(categ.name)}
                      className={cn(
                          "bg-transparent text-sm md:text-base/6 font-normal capitalize py-2.5 md:py-4 px-4 md:px-6 leading-normal rounded-lg md:rounded-[12px] h-fit shadow-none hover:bg-primary/70 hover:text-background transition-all",
                          {
                              "bg-primary text-white dark:text-background font-bold":
                                  categ.name === category,
                          }
                      )}
                  >
                      {categ.name}
                  </Button>
              ))}
          </div>
          <EmptyServices />
          <div className='flex justify-center mt-5'>
              <Button className='text-white py-3 px-10 h-fit'>Add {category}</Button>
          </div>
          <ProfileServiceForm service={category} />
    </div>
  )
}
