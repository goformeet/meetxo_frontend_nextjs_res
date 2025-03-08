'use client';
import React, { useState } from 'react'
import { Button } from '../ui/button'
import BecomeExpertModal from './become-expert-modal'
import Link from "next/link";

export default function JoinAsExpert() {
    const [open, setOpen] = useState(false);
  return (
      <>
          <Button className="text-white text-xs md:text-sm lg:text-base/[26px] py-[14px] px-5 h-fit rounded-full mt-8 md:mt-14">
              <Link href="/login">Join as Expert</Link>
          </Button>
          <BecomeExpertModal name='' open={open} setOpen={setOpen} />
      </>
  )
}
