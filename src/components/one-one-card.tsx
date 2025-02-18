import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

// export default function OneOneCard({ event }: { event: { id: number; image: string; title: string; description: string; location: string; date: string; time: string; host: string; } }) {
    export default function OneOneCard({
      event,
    }: {
      event: {
        _id: string;
        name: string;
        long_description: string;
        short_description: string;
        location: [number, number];
        created_at: string;
        online_pricing: number;
        duration:number
        // date: string;
        // time: string;
        // host: string;
      };
    }) {
      return (
        <div className="rounded-[18px] shadow-[0px_8px_30px_0px_rgba(80,85,136,0.06)] py-2 px-3 bg-background">
          <div className="relative">
            <Image
              src="/images/event-item.png"
              alt={event.name}
              width={287}
              height={131}
              className="max-h-[131px] w-full rounded-[10px]"
            />
            <div className="py-1.5 px-3.5 flex flex-col items-center justify-center flex-shrink-0 text-[#F0635A] text-[10px] font-medium rounded-[10px] bg-white/70 absolute top-2 left-2.5 uppercase">
              <p className="font-bold text-lg/[100%]">{event.duration}</p>
              <p className="font-medium text-[10px]">MIN</p>
            </div>
          </div>
          <p className="text-sm font-semibold leading-normal mt-[14px]">
            {event.name}
          </p>
          <p className="text-xs/[19px] tracking-[0.06px] text-[#384853] dark:text-[#A8B4C0]/90 mt-3">
            {event.long_description}
          </p>
          <div className="bg-primary-light mt-7 p-3 flex justify-between rounded-[8px]">
            <div className="flex items-center">
              <p className="text-[#E79913] text-[10px] font-bold leading-[14px]">
                $ {event.online_pricing} / Session
              </p>
            </div>
            <Link
              href={"/"}
              className="flex items-center text-xs text-[#E79913] font-bold"
            >
              Book Now
            </Link>
          </div>
        </div>
      );
    }
