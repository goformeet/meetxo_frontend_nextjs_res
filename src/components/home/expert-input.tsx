'use client';
import React, { useState } from 'react'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import BecomeExpertModal from './become-expert-modal';

export default function ExpertInput() {

    const [name, setName] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
   
  return (
      <div className="flex items-center bg-background border-[#F1F1F3] border rounded-[14px] p-1 mt-16 relative max-w-[638px] mx-auto">
          <div className="py-4 px-7 bg-surface rounded-[10px]">
              <span className="text-surface-foreground font-bold">www.meetxo.ai/</span>
          </div>
          <Input onChange={(e)=> setName(e.target.value)} type="text" placeholder="Enter your name" className="border-none focus-visible:ring-0 shadow-none placeholder:text-muted-foreground" />
          <Button onClick={()=> setOpen(true)} className="text-white text-lg/[27px] py-[18px] px-7 h-fit rounded-[12px]">Create</Button>
          <BecomeExpertModal name={name} open={open} setOpen={setOpen} />
      </div>
  )
}
