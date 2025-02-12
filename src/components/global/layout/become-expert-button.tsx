'use client';
import { useState } from 'react';
import Image from 'next/image';
import BecomeExpertModal from '@/components/home/become-expert-modal';
import { Button } from '@/components/ui/button';

export default function BecomeExpertButton() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <Button onClick={() => setOpen(true)} className="w-full py-2 px-4 h-[42px]">
                <Image width={25} height={24} src="/images/expert-button-icon.svg" alt="Calander Icon" />
                <p className="font-inter text-base font-medium leading-[160%] text-white">Become a Expert</p>
            </Button>
            <BecomeExpertModal name='' open={open} setOpen={setOpen}  />
      </>
  )
}
