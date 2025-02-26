'use client'
import React, { useTransition } from 'react'
import { AspectRatio } from './ui/aspect-ratio'
import Image from 'next/image'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


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
    username:string;
    profession_sub_category_id?: {
      title: string;
    }
  };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
     e.preventDefault();

     startTransition(() => {
       router.push(`/${prof?.username ? prof?.username : prof?.name}`);
     });
   };
  
  return (
    <Link
      href={`/${prof?.username ? prof?.username : prof?.name}`}
      className="relative"
      onClick={handleClick}
    >
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-lg">
          <span className="text-gray-800">Loading...</span>
        </div>
      )}
      <div className="w-full  bg-white/100">
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
      <p className="text-xs text-muted-foreground">
        {prof.profession_sub_category_id?.title}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-xs font-semibold">
          {prof.min_session_price ? (
            `$ ${prof.min_session_price}`
          ) : (
            <span className="text-[#52c627]">Free</span>
          )}
        </p>
        {prof?.average_rating ? (
          <div className="flex items-center gap-0.5">
            <Star className="h-4 w-auto fill-[#FBBC05] text-[#FBBC05]" />
            <span className="text-sm">{prof.average_rating}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <p className="text-xs text-muted-foreground line-clamp-3 mt-1">
        {prof.about_me}
      </p>
    </Link>
  );
}
