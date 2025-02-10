import Image from 'next/image'
import React from 'react'
import Dot from '../dot'
import { Button } from '../ui/button'

export default function ExpertProtfolio() {
    const skills = ['UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design',]

  return (
      <div className='max-w-[834px]'>
          <div className='p-4 rounded-[16px] border border-[#E0E0E0] flex flex-col gap-10 mb-6'>
              <h2 className='text-[32px]/[120%] font-medium'>Skills</h2>
              <div className='flex items-center flex-wrap gap-2'>
                  {
                      skills.map((skill, index) => (
                          <div key={index} className='px-3 py-1 flex justify-center items-center border border-[#E0E0E0] rounded-full'>
                              <p className='text-center text-base/[150%]'>{skill}</p>
                          </div>
                      ))
                  }
              </div>
          </div>
          <div className='p-4 rounded-[16px] border border-[#E0E0E0] flex flex-col gap-7 mb-6'>
              <h2 className='text-[32px]/[120%] font-medium'>Experiences</h2>
              <div className=''>
                  {
                      Array.from({ length: 3 }, (_, index) => (
                          <div key={index} className='flex items-start gap-6 border-b border-[#E0E0E0] last:border-b-0'>
                              <Image src={'/images/company-logo.svg'} alt="Comapny Logo" width={64} height={64} />
                              <div>
                                  <p className='text-lg/[130%] font-medium mb-2'>UI/UX Design</p>
                                  <div className='flex gap-2 items-center mb-2'>
                                      <p className='text-[#7C7C7C] text-base/[150%] font-normal'>EdTech</p>
                                      <Dot />
                                      <p className='text-[#7C7C7C] text-base/[150%] font-normal'>Full-Time</p>
                                      <Dot />
                                      <p className='text-[#7C7C7C] text-base/[150%] font-normal'>Jul 200 - Present (1y 2m)</p>
                                  </div>
                                  <p className='text-[#7C7C7C] text-base/[150%] font-normal mb-4'>Tokyo, Japan</p>
                                  <p className='text-base/[150%] text-foreground mb-[24px]'>Created and executed website for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.</p>
                              </div>
                          </div>
                      ))
                  }
              </div>
              <Button variant={'link'} className='text-primary text-base/[150%] font-semibold hover:no-underline'>Show 3 More experiences</Button>
          </div>

      </div>
  )
}
