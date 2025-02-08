'use client'
import React, { useState } from 'react'
import Image from 'next/image'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import ExpertCard from '../expert-card'

export default function ProfessionalsSection() {
  const [category, setCategory] = useState('All');

  const categories = [
    { id: 1, name: "Programmers" },
    { id: 2, name: "Engineers" },
    { id: 3, name: "Doctors" },
    { id: 4, name: "Strategists" },
    { id: 5, name: "Founders" },
    { id: 6, name: "Science & Tech" },
    { id: 7, name: "Marketing" },
    { id: 8, name: "Photography" }
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
    },
    {
      id: 6,
      name: 'Laura Sarmiento',
      image: '/images/card-image.png',
      price: 'SeasonPrice',
      rating: 5.0,
      bio: 'Figma ipsum component variant main layer. Editor variant overflow draft list vector follower arrow.'
    },
  ];

  return (
    <section className="px-4 md:px-7 lg:px-10 pt-[91px] pb-[55px]">
      <h5 className="text-center text-[28px]/[51px] font-bold capitalize">Search among <span className="text-primary">1.5k+</span> sp Experts and find your favorite Expert</h5>
      <div className="flex gap-4 items-center justify-center mt-4">
        <div className="bg-destructive-foreground rounded-[10px] py-1.5 px-4 flex gap-3 items-center max-w-[567px] w-full">
          <Button className="bg-foreground dark:bg-white text-background text-lg/[27px] py-[12px] px-7 rounded-[12px] h-fit">Categories</Button>
          <Input type="text" placeholder="Search Anything" className="border-none focus-visible:ring-0 shadow-none placeholder:text-muted-foreground" />
          <Image src={'/images/search-icon.png'} alt="" height={15} width={15} className="flex-shrink-0" />
        </div>
        <span className="text-maroon/75 font-roboto capitalize text-sm font-medium leading-normal text-center">Or view the following Experts...</span>
      </div>
      <div className="mt-[37px] flex gap-4 overflow-x-scroll no-scrollbar">
        <Button onClick={() => setCategory('All')} className={cn("bg-gray dark:bg-destructive-foreground dark:text-white font-roboto text-sm/normal font-medium capitalize py-5 px-7 leading-normal rounded-[12px] h-fit hover:text-white shadow-none", { 'bg-primary/35 dark:bg-primary/75 text-primary': category === 'All' })}>All</Button>
        {categories.map((categ) => (
          <Button key={categ.id} onClick={() => setCategory(categ.name)} className={cn("bg-gray dark:bg-destructive-foreground dark:text-white font-roboto text-sm/normal font-medium capitalize py-5 px-7 leading-normal rounded-[12px] h-fit hover:text-white shadow-none", { 'bg-primary/35 dark:bg-primary/75  text-primary': categ.name === category })}>{categ.name}</Button>
        ))}
      </div>
      <div className="mt-8">
        <div className="flex justify-between items-end">
          <h3 className="text-2xl/[215%] capitalize font-bold">Discover to the world’s Top Experts</h3>
          <Link className="text-primary font-medium text-sm" href={''}>View All</Link>
        </div>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-x-5 md:gap-y-8">
          {professionals.map((prof) => (
            <ExpertCard key={prof.id} prof={prof} />
          ))}
        </div>
        <div className="flex justify-center mt-16">
          <Button className="text-white text-lg/[150%] font-semibold py-[18px] px-7 rounded-[14px] h-fit">
            <Link href={'/explore'}>Explore Experts</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
