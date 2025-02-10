import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Star } from 'lucide-react';

export default function ReviewCard({ review, style }: { review: { avatar: string; name: string; message: string; }, style?: string; }) {
  return (
      <div className={`p-10 bg-review-card flex-shrink-0 rounded-[20px] flex flex-col gap-7 ${style}`}>
          <div className="flex gap-5">
              <Avatar className='h-10 w-10'>
                  <AvatarImage src={review.avatar} className="object-cover object-center" />
                  <AvatarFallback className='bg-[#E3E6EA] dark:bg-muted-foreground'>CN</AvatarFallback>
              </Avatar>
              <div>
                  <p className="text-xl/[130%] font-roboto font-bold tracking-[-1px]">{review.name}</p>
                  <p className="text-sm text-[#7E8492]">{review.name}</p>
              </div>
          </div>
          <p className="max-w-[391px] font-inter text-base/[26px] font-medium">{review.message}</p>
          <div className="flex gap-1.5">
              {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="h-5 w-5 fill-[#FBBC05] text-[#FBBC05]" />
              ))}
          </div>
      </div>
  )
}
