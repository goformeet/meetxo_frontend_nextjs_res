import EventCard from "@/components/event-card";
import { Input } from "@/components/ui/input";
import { getAllEvents } from "@/services/api";
import Image from "next/image";
import { notFound } from "next/navigation";

type EventType = {
    _id: string;
    image: string;
    title: string;
    description: string;
    location: string;
    start_date: string;
    profile_id: {
      name: string;
    }

  }


export const metadata = {
  title: "Upcoming Events – Live Learning & Networking at Meetxo.ai",
  description:
    "Join exclusive expert-led events, workshops, and webinars to upskill and grow your network - Meetxo.ai",
    keywords: "MeetXO events, live expert sessions, virtual events platform, MeetXO expert workshops, join MeetXO webinars, online learning events, MeetXO live sessions, interactive expert discussions, MeetXO speaker sessions, book an event on MeetXO, MeetXO online conferences, industry-specific webinars, professional growth events, learn from top experts, MeetXO networking events",
  metadataBase: new URL("https://meetxo.ai"),
  openGraph: {
  title: "Upcoming Events – Live Learning & Networking at Meetxo.ai",
    description:
    "Join exclusive expert-led events, workshops, and webinars to upskill and grow your network - Meetxo.ai",
    url: "https://meetxo.ai",
    images: [
      {
        url: "/EVENT_OG.png",
        width: 1200,
        height: 630,
        alt: "MeetXO Logo",
      },
    ],
  },

};

export default async function Page() {
    const { data } = await getAllEvents();
    const events = data;


        console.log(events.length)

    if(!events || !events.length){
        console.log(events)
        notFound();
    }

    return (
      <main className="px-4 md:px-7 lg:px-10 py-20">
{/*         <h1 className="text-lg/5 md:text-[22px]/[28px] font-bold">
         Discover, Connect, and Experience Events That Inspire and Excite!
        </h1> */}

           <div className="flex justify-between items-center">
        <h1 className="text-lg/5 md:text-[22px]/[28px] font-bold">
          Discover, Connect, and Experience Events That Inspire and Excite!
        </h1>
        <button className="flex items-center gap-2 text-gray-600 hover:text-black   px-3 py-1  transition duration-300">
          Create Event <ArrowUpRight size={18} />
        </button>
      </div>
          
        <div className="mt-4 md:mt-6 flex py-[1px] px-3.5 md:px-6 items-center rounded-[38px] border border-[#F1F2F4]">
          <Image
            src={"/icons/search-primary.svg"}
            alt="Search Icon"
            width={18}
            height={18}
          />
          <Input
            type="text"
            placeholder="Search by name, company, role"
            className="border-none focus-visible:ring-0 h-fit py-3 md:py-4 shadow-none placeholder:text-muted-foreground"
            // onChange={(e) => {
            //   getProfessionals(e.target.value,"search");
            // }}
          />
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5">
          {events.map((event: EventType) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </main>
    );
}
