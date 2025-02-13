'use client';
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Image from 'next/image';

export default function DateAndSlotSelection({
    dates,
    selectedDate,
    handleDateClick,
    selectedSlots,
    handleSlotClick,
    selectedSlot
}: {
        dates: Array<{ date: string }>;
        selectedDate: string | null;
        handleDateClick: (date: string) => void;
        selectedSlots: Array<string>;
        handleSlotClick: (slot: string) => void;
        selectedSlot: string;
}) {




    // Function to convert "DD/MM/YYYY" to "YYYY-MM-DD" (ISO format)
    const convertDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`; // "YYYY-MM-DD"
    };



  return (
      <div className='lg:w-2/5 rounded-[16px] border border-[#E3E6EA] p-[26px]'>
          <p className='text-lg/[26px] font-semibold'>Available sessions</p>
          <p className='text-[#6B7B8A] text-sm/[18px] mt-1'>Book 1:1 sessions from the options based on your needs</p>
          <div className='relative my-6'>
              <div className='flex gap-4 overflow-x-scroll no-scrollbar'>
                  {dates.map((item, index) => {
                      const formattedDate = convertDate(item.date);
                      const isSelected = selectedDate === item.date;

                      return (
                          <Button
                              key={index}
                              variant="link"
                              onClick={() => handleDateClick(item.date)}
                              className={cn(
                                  "rounded-[8px] border border-[#E3E6EA] pt-1.5 pb-[9px] px-4 flex flex-col items-center justify-center whitespace-nowrap h-fit hover:no-underline",
                                  { 'border-foreground border-[1.5px]': isSelected }
                              )}
                          >
                              <p className="uppercase text-[#6B7B8A] text-center text-[8px] font-bold">
                                  {new Date(formattedDate).toLocaleDateString('en-US', { weekday: 'short' })}
                              </p>
                              <p className="mt-1 text-sm/[18px] font-bold mb-3">
                                  {new Date(formattedDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                              </p>
                              {/* <p className="text-[#30D158] text-[9px]/4 font-bold">
                                  {item.slots.length} slots
                              </p> */}
                          </Button>
                      );
                  })}
              </div>
              <div className="absolute -right-6 top-1/2 -translate-y-1/2">
                  <Image src={'/images/forward-primary-icon.svg'} alt='Forward Icon' width={15} height={15} />
              </div>
          </div>
          <div className='flex pb-2 justify-between items-center border-b border-[#DEE2E6]'>
              <p className='text-base/6'>Select Time Zone</p>
              <Select defaultValue={'ist'}>
                  <SelectTrigger className='border-none shadow-none gap-1.5 w-fit focus:ring-0'>
                      <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectGroup>
                          <SelectLabel>North America</SelectLabel>
                          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                          <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                          <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                          <SelectLabel>Europe & Africa</SelectLabel>
                          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                          <SelectItem value="cet">Central European Time (CET)</SelectItem>
                          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                          <SelectItem value="west">
                              Western European Summer Time (WEST)
                          </SelectItem>
                          <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                          <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                          <SelectLabel>Asia</SelectLabel>
                          <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                          <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                          <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
                          <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                          <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                          <SelectItem value="ist_indonesia">
                              Indonesia Central Standard Time (WITA)
                          </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                          <SelectLabel>Australia & Pacific</SelectLabel>
                          <SelectItem value="awst">
                              Australian Western Standard Time (AWST)
                          </SelectItem>
                          <SelectItem value="acst">
                              Australian Central Standard Time (ACST)
                          </SelectItem>
                          <SelectItem value="aest">
                              Australian Eastern Standard Time (AEST)
                          </SelectItem>
                          <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
                          <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                          <SelectLabel>South America</SelectLabel>
                          <SelectItem value="art">Argentina Time (ART)</SelectItem>
                          <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                          <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                          <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
                      </SelectGroup>
                  </SelectContent>
              </Select>
          </div>
          {
              selectedDate && (
                  <div className='mt-[18px] grid grid-cols-2 md:grid-cols-3 gap-4'>
                      {
                          selectedSlots.map((slot, index) => (
                              <Button
                                  key={index}
                                  onClick={() => handleSlotClick(slot)}
                                  variant="link" className={cn('py-4 px-9 inline-flex justify-center items-center rounded-[9px] border border-[#E3E6EA] h-fit hover:no-underline text-foreground', { 'border-primary text-primary': slot === selectedSlot })}>
                                  <p className='text-base/6 text-center font-bold'>{slot}</p>
                              </Button>
                          ))
                      }
                  </div>
              )
          }
      </div>
  )
}
