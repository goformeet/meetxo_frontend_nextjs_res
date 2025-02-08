'use client';
import ExpertCard from '@/components/expert-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

export default function Explore() {

  const [filters, setFilters] = useState<string[]>([]);
  const toggleFilter = (name: string) => {
    setFilters((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const filterItems = [
    { id: 1, name: "👩‍ Psychology" },
    { id: 2, name: "🌏 Science" },
    { id: 3, name: "🎨 Art" },
    { id: 4, name: "🏋 Gym" },
    { id: 5, name: "🖌 Design" },
    { id: 6, name: "👽‍‍ 3D Design" },
    { id: 7, name: "🎼 Music" },
  ];
  
  const professionals = [
    {
      id: 1,
      name: 'Laura Sarmiento',
      image: '/images/card-image.png',
      price: 'SeasonPrice',
      rating: 5.0,
      bio: 'Figma ipsum component variant main layer. Editor variant overflow draft list vector follower arrow.'
    },
    {
      id: 2,
      name: 'Laura Sarmiento',
      image: '/images/card-image-s.png',
      price: 'SeasonPrice',
      rating: 5.0,
      bio: 'Figma ipsum component variant main layer. Editor variant overflow draft list vector follower arrow.'
    },
    {
      id: 3,
      name: 'Laura Sarmiento',
      image: '/images/card-image.png',
      price: 'SeasonPrice',
      rating: 5.0,
      bio: 'Figma ipsum component variant main layer. Editor variant overflow draft list vector follower arrow.'
    },
    {
      id: 4,
      name: 'Laura Sarmiento',
      image: '/images/card-image.png',
      price: 'SeasonPrice',
      rating: 5.0,
      bio: 'Figma ipsum component variant main layer. Editor variant overflow draft list vector follower arrow.'
    },
    {
      id: 5,
      name: 'Laura Sarmiento',
      image: '/images/card-image-s.png',
      price: 'SeasonPrice',
      rating: 5.0,
      bio: 'Figma ipsum component variant main layer. Editor variant overflow draft list vector follower arrow.'
    }
  ];
  return (
    <div className='pl-5 pt-5 pr-[35px] max-w-[calc(100%-105px)]'>
      <h1 className='text-[22px]/[28px] font-bold'>Select an expert, schedule a session, and receive guidance via video call.</h1>
      <div className='mt-6 flex py-[1px] px-6 items-center rounded-[38px] border border-[#F1F2F4]'>
        <Image src={'/icons/search-primary.svg'} alt='Search Icon' width={18} height={18} />
        <Input type="text" placeholder="Search by name, company, role" className="border-none focus-visible:ring-0 h-fit py-4 shadow-none placeholder:text-muted-foreground" />
      </div>
      <div className=''>
        <div className='flex gap-7 mt-8 overflow-x-scroll no-scrollbar'>
          {
            Array.from({ length: 10 }, (_, index) => (
              <div key={index} className='flex flex-col gap-4'>
                <Avatar className='h-[119px] w-[119px]'>
                  <AvatarImage src={'/images/avatar.svg'} />
                  <AvatarFallback className='bg-[#E3E6EA] dark:bg-muted-foreground'>CN</AvatarFallback>
                </Avatar>
                <p className='text-center text-lg font-medium '>Influencers</p>
              </div>
            ))
          }
        </div>
        <div className='flex gap-4 my-7 overflow-x-scroll no-scrollbar'>
          {filterItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => toggleFilter(item.name)}
              variant='outline'
              className={cn(
                "rounded-full p-3.5 text-xs border h-fit border-[#E3E7EC]",
                { "border-primary text-primary": filters.includes(item.name) }
              )}
            >
              {item.name}
            </Button>
          ))}
        </div>
        <div className='mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-x-5 md:gap-y-8'>
          {professionals.map((prof) => (
            <ExpertCard key={prof.id} prof={prof} />
          ))}
        </div>
        <div>
          <div className='flex justify-between items-center'>
            <h2 className='mb-7 text-[22px]/7 font-bold'>Mentors</h2>
            <Link href={'/mentors'} className='text-primary font-bold text-[15px]/7'>See all</Link>
          </div>
          <div className='mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-x-5 md:gap-y-8'>
            {professionals.map((prof) => (
              <ExpertCard key={prof.id} prof={prof} />
            ))}
          </div>
        </div>
        <div>
          <div className='flex justify-between items-center'>
            <h2 className='mb-7 text-[22px]/7 font-bold'>Influencers</h2>
            <Link href={'/mentors'} className='text-primary font-bold text-[15px]/7'>See all</Link>
            </div>
          <div className='mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-x-5 md:gap-y-8'>
            {professionals.map((prof) => (
              <ExpertCard key={prof.id} prof={prof} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
