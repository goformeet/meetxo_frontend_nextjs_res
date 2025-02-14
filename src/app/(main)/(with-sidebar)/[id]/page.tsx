"use client";
import ExpertProtfolio from "@/components/experts/expert-protfolio";
import ExpertReviews from "@/components/experts/expert-reviews";
import ExpertServices from "@/components/experts/expert-services";
// import Footer from "@/components/global/layout/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Hosts } from "@/services/api";
import { TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import Link from "next/link";
import React, {  useEffect, useState } from "react";
interface Expert {
  _id: string;
  name: string;
  user_id: {
    _id: string;
  };
  profile_image: string;
  cover_image: string;
  min_session_price: string;
  average_rating: number;
  about_me: string;
  username:string
  profession_id: {
    title: string;
    description: string;
  };
}
export default function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
   
    const [data, setData] = useState<Expert | null>(null);
    const tabHeaders = [
        {
            title: "Overview",
            value: "overview",
        },
        {
            title: "Portfolio",
            value: "portfolio",
        },
        {
            title: "Reviews",
            value: "reviews",
        },
    ];

    const fetchingData = async () => {
        try {
            const id = (await params).id;
           
            const name = id.replace(/%20/g, " ");
            const res = await Hosts({ search: name });

            if (res.success) {
               
                setData(res.hosts.hosts[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    
    useEffect(() => {
        fetchingData();
    }, []);


    return (
      // <div className=" flex-grow pr-[35px] max-w-[calc(100%-103.45px)]">
      <div className="flex-grow mx-4 md:mx-7 lg:mx-10">
        <div className="relative pb-20 md:pb-[110px]">
          <Image src={data?.cover_image
            ? data.cover_image
            : "https://res.cloudinary.com/djocenrah/image/upload/v1739182656/Untitled_design_33_esnuv5.png"} alt="" width={1318} height={180} className="w-full h-28 md:h-[180px] object-cover object-center" />
          <div className="flex flex-col md:flex-row gap-4 absolute bottom-0 left-8 md:items-center">
            <Avatar className="h-20 w-20 md:h-[190px] md:w-[190px] border-4 border-background">
              <AvatarImage
                src={data?.profile_image}
                className="object-cover object-center"
              />
              <AvatarFallback className="bg-[#E3E6EA] dark:bg-muted-foreground">
                CN
              </AvatarFallback>
            </Avatar>
            <div className="md:mt-16 flex-shrink-0">
              <h1 className="text-base md:text-[31px]/9 font-bold">{data?.name}</h1>
              <p className="mt-1 text-sm md:text-lg/7">{data?.profession_id?.title}</p>
            </div>
          </div>
          <div className="absolute right-0  md:bottom-4 flex items-center gap-3">
            <Link href={'/'} className="h-10 w-10 bg-primary-light rounded-full flex justify-center items-center">
              <Image src={'/images/linked-in-logo.png'} alt="linked in" width={40} height={40} className="h-[26px] w-[26px] object-contain object-center" />
            </Link>
            <Link href={'/'} className="h-10 w-10 bg-primary-light rounded-full flex justify-center items-center">
              <Image src={'/images/youtube-icon.png'} alt="linked in" width={40} height={40} className="h-[26px] w-[26px] object-contain object-center" />
            </Link>
            <Link href={'/'} className="h-10 w-10 bg-primary-light rounded-full flex justify-center items-center">
              <Image src={'/images/git-hub-icon.png'} alt="linked in" width={40} height={40} className="h-[26px] w-[26px] object-contain object-center" />
            </Link>
          </div>

        </div>
        <div className="pt-7">
          <Tabs defaultValue="overview">
            <TabsList className="gap-[36px] bg-background border-b w-full h-fit px-0 py-0 justify-start rounded-none">
              {tabHeaders.map((tab) => (
                <TabsTrigger
                  className="data-[state=active]:text-primary border-b-[3px] border-transparent data-[state=active]:border-primary text-[15px]/[25px] font-medium py-2"
                  key={tab.value}
                  value={tab.value}
                >
                  {tab.title}
                  {tab.value == "reviews" && (
                    <span className="inline-flex ml-2 bg-primary text-white justify-center items-center rounded-full px-2.5">
                      19
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="overview">
              <div className="py-4 px-6 mt-6 rounded-[16px] border border-[#F1F2F4] text-lg/8 font-medium">
                <p>{data?.about_me}</p>
                <p className="mt-4"></p>
              </div>
              {data?.user_id && (
                <ExpertServices
                  id={data.user_id._id}
                  username={data.username}
                />
              )}
            </TabsContent>
            <TabsContent value="portfolio">
              <ExpertProtfolio />
            </TabsContent>
            <TabsContent value="reviews">
              <ExpertReviews />
            </TabsContent>
          </Tabs>
        </div>
        {/* <Footer /> */}
      </div>
    );
}
