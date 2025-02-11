'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathName = usePathname();
    const items = [
        {
            icon: '/icons/sidebar-icons/home-icon.svg',
            activeIcon: '/icons/sidebar-icons/home-active.svg',
            title: 'Home',
            url: '/'
        },
        {
            icon: '/icons/sidebar-icons/explore-icon.svg',
            activeIcon: '/icons/sidebar-icons/explore-active.svg',
            title: 'Explore',
            url:'/explore'
        },
        {
            icon: '/icons/sidebar-icons/booking-icon.svg',
            activeIcon: '/icons/sidebar-icons/explore-icon.svg',
            title: 'Bookings',
            url: '/bookings'
        },
        {
            icon: '/icons/sidebar-icons/messages-icon.svg',
            activeIcon: '/icons/sidebar-icons/explore-icon.svg',
            title: 'Messages',
            url: '/messages'
        }
    ];
  return (
      <aside className="py-7 px-4 bg-gray">
          <div className="flex flex-col gap-2.5">
              {items.map((item) => (
                  <Link href={item.url} key={item.title} className="flex flex-col gap-0.5 items-center p-2 px-3.5">
                      <div className={cn("p-2 flex-shrink-0 rounded-[8px]  transition-all duration-300 ", {'bg-sidebar-icon-bg': pathName === item.url})}>
                          <Image className="h-auto w-auto" src={pathName == item.url ? item.activeIcon : item.icon} width={24} height={24} alt={`${item.title} Icon`} />
                      </div>
                      <p className="text-[#384853] dark:text-[#A8B4C0]/90 font-inter text-[9px]/4">{item.title}</p>
                  </Link>
              ))}
          </div>
      </aside>
  )
}
