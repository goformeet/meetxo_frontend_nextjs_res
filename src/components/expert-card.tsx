import React from 'react'
import { AspectRatio } from './ui/aspect-ratio'
import Image from 'next/image'
import { Star } from 'lucide-react'

export default function ExpertCard({ prof }: { prof: { image: string; name: string; price: string; rating: number; bio: string; }}) {
  return (
      <div className="relative">
          <div className="w-full">
              <AspectRatio ratio={1 / 1}>
                  <Image
                      src={prof.image}
                      alt={prof.name}
                      fill
                      className="rounded-lg object-cover"
                  />
              </AspectRatio>
          </div>
          <p className="text-sm font-bold">{prof.name}</p>
          <div className="flex justify-between items-center">
              <p className="text-xs font-semibold">${prof.price}</p>
              <div className="flex items-center gap-0.5">
                  <Star className="h-4 w-auto fill-[#FBBC05] text-[#FBBC05]" />
                  <span className="text-sm">{prof.rating}</span>
              </div>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-3 mt-1">{prof.bio}</p>
      </div>
  )
}
