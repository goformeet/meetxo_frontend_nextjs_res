'use client'
import React from 'react'
import { AspectRatio } from './ui/aspect-ratio'
import Image from 'next/image'
import { Star } from 'lucide-react'
import Link from 'next/link'

export default function ExpertCard({
  prof,
}: {
  prof: {
    profile_image: string;
    name: string;
    min_session_price: string;
    average_rating: number;
    about_me: string;
    _id: string;
    username:string
  };
}) {
  return (
    <Link href={`/expert/${prof.username}`} className="relative">
      <div className="w-full">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={prof.profile_image}
            alt={prof.name}
            fill
            className="rounded-lg object-cover"
          />
        </AspectRatio>
      </div>
      <p className="text-sm font-bold">{prof.name}</p>
      <div className="flex justify-between items-center">
        <p className="text-xs font-semibold">
          ${prof.min_session_price ? prof.min_session_price : 0.0}
        </p>
        <div className="flex items-center gap-0.5">
          <Star className="h-4 w-auto fill-[#FBBC05] text-[#FBBC05]" />
          <span className="text-sm">{prof.average_rating}</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-3 mt-1">
        {prof.about_me}
      </p>
    </Link>
  );
}
