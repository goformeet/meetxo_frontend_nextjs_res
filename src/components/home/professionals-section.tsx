"use client";
import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ExpertCard from "../expert-card";
import { Hosts, Professions } from "@/services/api";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

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
interface Category {
  _id: string;
  title: string;
}

export default function ProfessionalsSection() {
  const [category, setCategory] = useState<string|boolean>(true);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  // const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const getProfessionals = async () => {
    try {
      // setLoading(true);
      const filters: Record<string, string | boolean> = {};
      if (searchValue) filters.search = searchValue;
      if (category) {
        if (typeof category == "boolean") {
          filters.is_top_expert = category;
        }else{
          filters.profession_id=category
        }
      }

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
  };

  const getProfessions = async () => {
    try {
      
      const res = await Professions();
      if (res?.success && Array.isArray(res.professions)) {
        setCategories(res.professions);
      } else {
        setCategories([]);
      }
    } catch (error) {
      setCategories([]);
      throw error
    }
  };
  // const onchangeCat = (cat: string, id: string | boolean) => {
  //   setCategory(id);
  //   if (cat == "is_top_expert") {
  //     getProfessionals(id, "is_top_expert");
  //   } else {
  //     getProfessionals(id, "profession_id");
  //   }
  // };
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
  
     const handleClick = () => {
       
  
       startTransition(() => {
         router.push(`/experts`); 
       });
     };
  useEffect(() => {
    // getProfessionals("","search");
    getProfessions();
  }, [false]);
  useEffect(() => {
    getProfessionals();
  }, [category,searchValue]);

  return (
    <section className="px-4 md:px-7 lg:px-10 pt-[91px] pb-[55px]">
      <h5 className="text-center text-xl md:text-[28px]/[51px] font-bold capitalize">
        {/* <span className="text-primary">1.5k+</span> sp */}
        Search among Our Experts and find your favorite Expert
      </h5>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-4">
        <div className="bg-destructive-foreground rounded-[10px] py-1.5 px-2 md:px-4 flex gap-3 items-center max-w-[567px] w-full">
          <Button className="bg-foreground dark:bg-white text-background text-sm md:text-lg/[27px] py-2 md:py-[12px] px-3 md:px-7 rounded-[12px] h-fit">
            Categories
          </Button>
          <Input
            type="text"
            placeholder="Search Experts"
            className="border-none focus-visible:ring-0 shadow-none placeholder:text-sm md:placeholder:text-base placeholder:text-muted-foreground"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Image
            src={"/images/search-icon.png"}
            alt=""
            height={15}
            width={15}
            className="flex-shrink-0"
          />
        </div>
        <span className="text-maroon/75 font-roboto capitalize text-sm font-medium leading-normal text-center">
          Or view the following Experts...
        </span>
      </div>
      <div className="mt-[37px] flex gap-4 overflow-x-scroll no-scrollbar">
        <Button
          // onClick={() => onchangeCat("is_top_expert", true)}
          onClick={() => {
            setCategory(true);
          }}
          className={cn(
            "bg-gray dark:bg-destructive-foreground dark:text-white font-roboto text-sm/normal font-medium capitalize py-2.5 md:py-5 px-3.5 md:px-7 leading-normal rounded-[12px] h-fit hover:text-white shadow-none",
            {
              "bg-primary/35 dark:bg-primary/75 text-primary":
                category === true,
            }
          )}
        >
          Top expert
        </Button>
        {categories.map((categ) => (
          <Button
            key={categ._id}
            // onClick={() => onchangeCat(categ.title, categ._id)}
            onClick={() => setCategory(categ._id)}
            className={cn(
              "bg-gray dark:bg-destructive-foreground dark:text-white font-roboto text-sm/normal font-medium capitalize py-2.5 md:py-5 px-3.5 md:px-7 leading-normal rounded-[12px] h-fit hover:text-white shadow-none",
              {
                "bg-primary/35 dark:bg-primary/75  text-primary":
                  categ._id === category,
              }
            )}
          >
            {categ.title}
          </Button>
        ))}
      </div>
      <div className="mt-8">
        <div className="flex justify-between items-end">
          <h3 className="text-sm md:text-2xl/[215%] capitalize font-bold">
            Discover to the world’s Top Experts
          </h3>
          <Link
            className="text-primary font-medium text-xs md:text-sm"
            href={"/experts"}
          >
            View All
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-x-5 md:gap-y-8">
          {professionals.map((prof) => (
            <ExpertCard key={prof._id} prof={prof} />
          ))}
        </div>
        <div className="flex justify-center mt-8 md:mt-16">
          <Button
            disabled={isPending}
            className="text-white text-sm md:text-lg/[150%] font-semibold py-3 md:py-[18px] px-4 md:px-7 rounded md:rounded-[14px] h-fit"
            onClick={(e)=>{
              e.preventDefault()
              handleClick()
            }}
          >
            {/* <Link href={"/experts"}> */}
              {" "}
              {isPending ? (
                <Loader className="h-5 w-5 animate-spin" /> 
              ) : (
                "Explore Experts"
              )}
            {/* </Link> */}
          </Button>
        </div>

        {/*       <div className="flex justify-center mt-8 md:mt-16">
          <Button
            disabled={isPending}
            onClick={handleClick}
            className="text-white text-sm md:text-lg/[150%] font-semibold py-3 md:py-[18px] px-4 md:px-7 rounded md:rounded-[14px] h-fit"
          >
            {isPending ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <Link href={"/experts"} className="w-full h-full">
                Explore Experts
              </Link>
            )}
          </Button>
        </div> */}
      </div>
    </section>
  );
}
