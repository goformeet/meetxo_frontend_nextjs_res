'use client';
import React, { useEffect, useState } from 'react'
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
  selectedSlot,
}: {
  dates: Array<{ date: string }>;
  selectedDate: string | null;
  handleDateClick: (date: string) => void;
  selectedSlots: Array<{ slot: string; is_available: boolean }>;
  handleSlotClick: (slot: string) => void;
  selectedSlot: string;
}) {
  const [timezone, setTimezone] = useState<string>("ist");
  // Function to convert "DD/MM/YYYY" to "YYYY-MM-DD" (ISO format)
  const convertDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("User Timezone:", userTimezone);

    const timezoneMap: { [key: string]: string } = {
      "Asia/Kolkata": "ist",
      "America/New_York": "est",
      "America/Chicago": "cst",
      "America/Denver": "mst",
      "America/Los_Angeles": "pst",
      "America/Anchorage": "akst",
      "America/Honolulu": "hst",
      "Europe/London": "gmt",
      "Europe/Paris": "cet",
      "Europe/Berlin": "cet",
      "Europe/Moscow": "msk",
      "Asia/Shanghai": "cst_china",
      "Asia/Tokyo": "jst",
      "Asia/Seoul": "kst",
      "Australia/Sydney": "aest",
      "Australia/Perth": "awst",
      "Pacific/Auckland": "nzst",
      "Pacific/Fiji": "fjt",
      "America/Argentina/Buenos_Aires": "art",
      "America/Sao_Paulo": "brt",
    };

    if (timezoneMap[userTimezone]) {
      setTimezone(timezoneMap[userTimezone]);
    }
  }, []);

  return (
    <div className="lg:w-2/5 rounded-[16px] border border-[#E3E6EA] p-[26px]">
      <p className="text-lg/[26px] font-semibold">Available sessions</p>
      <p className="text-[#6B7B8A] text-sm/[18px] mt-1">
        Book 1:1 sessions from the options based on your needs
      </p>
      <div className="relative my-6">
        <div className="flex gap-4 overflow-x-scroll no-scrollbar">
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
                  { "border-foreground border-[1.5px]": isSelected }
                )}
              >
                <p className="uppercase text-[#6B7B8A] text-center text-[8px] font-bold">
                  {new Date(formattedDate).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <p className="mt-1 text-sm/[18px] font-bold mb-3">
                  {new Date(formattedDate).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
                {/* <p className="text-[#30D158] text-[9px]/4 font-bold">
                                  {item.slots.length} slots
                              </p> */}
              </Button>
            );
          })}
        </div>
        <div className="absolute -right-6 top-1/2 -translate-y-1/2">
          <Image
            src={"/images/forward-primary-icon.svg"}
            alt="Forward Icon"
            width={15}
            height={15}
          />
        </div>
      </div>
      <div className="flex pb-2 justify-between items-center border-b border-[#DEE2E6]">
        <p className="text-base/6">Select Time Zone</p>
        <Select value={timezone} onValueChange={setTimezone}>
          <SelectTrigger className="border-none shadow-none gap-1.5 w-fit focus:ring-0">
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
              <SelectItem value="cst_china">
                China Standard Time (CST)
              </SelectItem>
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
              <SelectItem value="nzst">
                New Zealand Standard Time (NZST)
              </SelectItem>
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
      {selectedDate && (
        <div className="mt-[18px] grid grid-cols-2 md:grid-cols-3 gap-4">
          {selectedSlots.map((slot, index) => (
            <Button
              key={index}
              onClick={() => handleSlotClick(slot.slot)}
              disabled={!slot.is_available}
              variant="link"
              className={cn(
                "py-4 px-9 inline-flex justify-center items-center rounded-[9px] border border-[#E3E6EA] h-fit hover:no-underline text-foreground",
                { "border-primary text-primary": slot.slot === selectedSlot }
              )}
            >
              <p className="text-base/6 text-center font-bold">{slot.slot}</p>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
