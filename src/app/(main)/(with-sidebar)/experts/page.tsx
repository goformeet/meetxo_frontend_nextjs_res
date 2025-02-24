"use client";
import ExpertCard from "@/components/expert-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Hosts, Professions, ProfessionSubCategories } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import debounce from "lodash/debounce";

type Professional= {
  _id: string;
  name: string;
  profile_image: string;
  min_session_price: string;
  average_rating: number;
  about_me: string;
  username:string
  profession_id: {
    title: string;
  };
}
type Category= {
  _id: string;
  title: string;
  image: string;
}
type FilterItem ={
  _id: string;
  title: string;
}

// export const metadata = {
//   title: "Meta Title: Book Top Experts for 1:1 Advice at MeetXO",
//   description:
//     "Connect with the world's most in-demand experts for 1-on-1 guidance. Ask questions, get expert advice, and grow with personalized insights.",
//     keywords: "Monetize Your Expertise Online, Join as an Expert & Earn, Offer Paid Expert Consultations, Get Clients as an Online Coach, Start Your Virtual Consulting Business, Create Your Expert Profile Free, Grow Your Brand as an Expert, Become a Mentor & Guide Others, Earn Money Sharing Your Knowledge, Find Clients for Consulting Online, Boost Your Career with MeetXO, Get Paid for Your Advice, Online Platform for Industry Experts, Showcase Your Skills & Get Bookings, Work as a Virtual Consultant",
//   metadataBase: new URL("https://meetxo.ai"),
//   openGraph: {
//   title: "Meta Title: Book Top Experts for 1:1 Advice at MeetXO",
//     description:
//     "Connect with the world's most in-demand experts for 1-on-1 guidance. Ask questions, get expert advice, and grow with personalized insights.",
//     url: "https://meetxo.ai",
//     images: [
//       {
//         url: "/og_image.png",
//         width: 1200,
//         height: 630,
//         alt: "MeetXO Logo",
//       },
//     ],
//   },

// };



export default function Explore() {
  const [filters, setFilters] = useState<string[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  // const [loading, setLoading] = useState(false);
  const [filterItems, setFilterItems] = useState<FilterItem[]>([]);
  const [searchValue,setSearchValue]=useState<string>("")
  const [profession, setProfession]=useState<string|boolean>("")
  const [sub_profession, setSub_profession]=useState<string>("")
  const [mentors,setMentors]=useState<Professional[]>([])
  const [influencers, setInfluencers]=useState<Professional[]>([]);
  const toggleFilter = (name: string,id:string) => {
    setFilters((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
    // getProfessionals(id, "sub_profession_id");
    setSub_profession(id)
  };


 
 const getMentorsAndInfluencers = async () => {
   try {
     const [res, res1] = await Promise.all([
       Hosts({ profession_id: "678b8dd486062ddce62be676" }),
       Hosts({ profession_id: "678b8f0586062ddce62be678" }),
     ]);

     console.log("Mentors API Response:", res);
     console.log("Influencers API Response:", res1);

     if (res?.success && Array.isArray(res.hosts?.hosts)) {
       console.log("Setting Mentors:", res.hosts.hosts);
       setMentors(res.hosts.hosts);
     } else {
       console.warn("Invalid mentors response:", res);
     }

     if (res1?.success && Array.isArray(res1.hosts?.hosts)) {
       console.log("Setting Influencers:", res1.hosts.hosts);
       setInfluencers(res1.hosts.hosts);
     } else {
       console.warn("Invalid influencers response:", res1);
     }
   } catch (error) {
     console.error("Error fetching mentors & influencers:", error);
   }
 };


  const getProfessionals = debounce(async () => {
    try {
      // setLoading(true);
       const filters: Record<string, string | boolean> = {};
       if (searchValue) filters.search = searchValue;
       if (profession) {
         if (typeof profession == "boolean") {
           filters.is_top_expert = profession;
         } else {
           filters.profession_id = profession;
         }
       }
       if (sub_profession) filters.sub_profession_id = sub_profession;

      const res = await Hosts(filters); 

      if (res?.hosts?.hosts && Array.isArray(res.hosts.hosts)) {
        setProfessionals(res.hosts.hosts);
      } else {
        console.error("Invalid response structure:", res);
        setProfessionals([]);
      }
    } catch (error) {
      console.error("Error fetching professionals:", error);
      setProfessionals([]);
    } finally {
      // setLoading(false);
    }
  }, 300); 

  const getProfessions = async () => {
    try {
      const res = await Professions();
      if (res?.success && Array.isArray(res.professions)) {
        setCategories(res.professions);
      } else {
        console.error("Invalid response structure:", res);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching professionals:", error);
      setCategories([]);
    }
  };
  const filterItemsFun = async (id: string) => {
    if (id == "is_top_expert") return
       const res = await ProfessionSubCategories(id);
    if (res?.success && Array.isArray(res.sub_categories)) {
      setFilterItems(res.sub_categories);
    } else {
      console.error("Invalid response structure:", res);
      setFilterItems([]);
    }
  };
  useEffect(() => {
    // getProfessionals("","search");
    getProfessions();
    getMentorsAndInfluencers()
  },[]);

  useEffect(() => {
    getProfessionals()
  }, [searchValue, profession, sub_profession]);

  return (
    // max-w-[calc(100%-105px)] shoduld be added here when side bar is there
    <div className="px-4 md:px-7 lg:px-10">
      <h1 className="text-lg/5 md:text-[22px]/[28px] font-bold">
        Select an expert, schedule a session, and receive guidance via video
        call.
      </h1>
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
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="">
        <div className="flex gap-3.5 md:gap-7 mt-8 overflow-x-scroll no-scrollbar">
          <div
            className="flex flex-col gap-2 md:gap-4"
            onClick={() => {
              setFilters([]);
              setSub_profession("");
              filterItemsFun("is_top_expert");
              setProfession(true);
            }}
          >
            <Avatar className="h-16 w-[119px]">
              <AvatarImage
                width={50}
                src={
                  "https://res.cloudinary.com/djocenrah/image/upload/f_auto,q_auto/v1/Meetxo/claipwjobdg9hltgiiu9"
                }
                className="object-cover object-center"
              />
              <AvatarFallback className="bg-[#E3E6EA] dark:bg-muted-foreground">
                Top Expert
              </AvatarFallback>
            </Avatar>
            <p className="text-center text-lg font-medium ">Top Expert</p>
          </div>
          {categories.map((da, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-2 md:gap-4"
                onClick={() => {
                  setFilters([]);
                  setSub_profession("");
                  filterItemsFun(da._id);
                  setProfession(da._id);
                }}
              >
                <Avatar className="h-16 w-[119px]">
                  <AvatarImage
                    width={50}
                    src={da.image}
                    className="object-cover object-center"
                  />
                  <AvatarFallback className="bg-[#E3E6EA] dark:bg-muted-foreground">
                    {da.title}
                  </AvatarFallback>
                </Avatar>
                <p className="text-center text-lg font-medium ">{da.title}</p>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 my-3.5 md:my-7 overflow-x-scroll no-scrollbar">
          {filterItems.map((item) => (
            <Button
              key={item._id}
              onClick={() => {
                if (filters.includes(item.title)) {
                  setFilters(filters.filter((d) => d !== item.title));
                  setSub_profession("");
                } else {
                  toggleFilter(item.title, item._id);
                }
              }}
              variant="outline"
              className={cn(
                "rounded-full p-3.5 text-xs border h-fit border-[#E3E7EC]",
                { "border-primary text-primary": filters.includes(item.title) }
              )}
            >
              {item.title}
            </Button>
          ))}
        </div>
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-x-5 md:gap-y-8">
          {professionals.map((prof) => (
            <ExpertCard key={prof._id} prof={prof} />
          ))}
        </div>
        {!(profession || sub_profession || searchValue) ? (
          <>
            <div>
              <div className="flex justify-between items-center">
                <h2 className="mb-7 text-[22px]/7 font-bold">Mentors</h2>
                <Link
                  href={"/experts"}
                  className="text-primary font-bold text-[15px]/7"
                >
                  See all
                </Link>
              </div>
              <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-x-5 md:gap-y-8">
                {mentors.map((prof) => (
                  <ExpertCard key={prof._id} prof={prof} />
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <h2 className="mb-7 text-[22px]/7 font-bold">Influencers</h2>
                <Link
                  href={"/experts"}
                  className="text-primary font-bold text-[15px]/7"
                >
                  See all
                </Link>
              </div>
              <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-x-5 md:gap-y-8">
                {influencers.map((prof) => (
                  <ExpertCard key={prof._id} prof={prof} />
                ))}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
