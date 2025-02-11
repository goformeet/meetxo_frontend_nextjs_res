import React from 'react'
import ReviewCard from '../review-card';

export default function ExpertReviews() {
    const reviews = [
        {
            avatar: '/images/avatar.svg',
            name: 'Savannah Nguyen',
            profession: 'CEO Sans Brothers',
            message: 'It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.'
        },
        {
            avatar: '/images/avatar.svg',
            name: 'Eleanor Pena',
            profession: 'CEO Sans Brothers',
            message: 'It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.'
        },
        {
            avatar: '/images/avatar.svg',
            name: 'Savannah Nguyen',
            profession: 'CEO Sans Brothers',
            message: 'It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.'
        },
        {
            avatar: '/images/avatar.svg',
            name: 'Eleanor Pena',
            profession: 'CEO Sans Brothers',
            message: 'It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.'
        },
        {
            avatar: '/images/avatar.svg',
            name: 'Savannah Nguyen',
            profession: 'CEO Sans Brothers',
            message: 'It was a pleasure working with the Coca team. They understood the brief correctly and delivered great designs exceeding the expectations.'
        },
    ];
  return (
      <div className='my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
          {
              reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} style='p-6 !bg-background border border-[#E0E0E0]'  />  
              ))
          }
    </div>
  )
}
