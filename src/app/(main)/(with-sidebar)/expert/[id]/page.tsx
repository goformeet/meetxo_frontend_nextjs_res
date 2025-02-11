"use client";
import Dot from "@/components/dot";
import ExpertProtfolio from "@/components/experts/expert-protfolio";
import ExpertReviews from "@/components/experts/expert-reviews";
import ExpertServices from "@/components/experts/expert-services";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Hosts } from "@/services/api";
import { TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface Expert {
    _id: string;
    name: string;
    profile_image: string;
    cover_image: string;
    min_session_price: string;
    average_rating: number;
    about_me: string;
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
    //   const id = (await params).id;
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

    const skills = [
        "UI/UX Design",
        "UI/UX Design",
        "UI/UX Design",
        "UI/UX Design",
        "UI/UX Design",
        "UI/UX Design",
        "UI/UX Design",
        "UI/UX Design",
        "UI/UX Design",
        "UI/UX Design",
        "UI/UX Design",
    ];

    const fetchingData = async () => {
        try {
            const id = (await params).id;
            const name = id.replace(/%20/g, " ");
            const res = await Hosts({ search: name });

            if (res.success) {
                console.log(res.hosts.hosts[0]);
                setData(res.hosts.hosts[0]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchingData();
    }, []);


    return (
        <div className="flex-grow pr-[35px] max-w-[calc(100%-103.45px)]">
            <div
                className={`pl-5 flex gap-[18px] items-end  bg-no-repeat bg-top bg-cover bg-background pt-[104px]`}
                style={{
                    backgroundImage: `url(${data?.cover_image ? data.cover_image : "/images/expert-bg.png"
                        })`,
                    backgroundSize: "100% 180px",
                }}
            >
                <Avatar className="h-[190px] w-[190px] border-4 border-background">
                    <AvatarImage src={data?.profile_image} className="object-cover object-center" />
                    <AvatarFallback className="bg-[#E3E6EA] dark:bg-muted-foreground">
                        CN
                    </AvatarFallback>
                </Avatar>
                <div className="mb-9">
                    <h1 className="text-[31px]/9 font-bold">{data?.name}</h1>
                    <p className="mt-1 text-lg/7">{data?.profession_id?.title}</p>
                </div>
            </div>
            <div className="pl-5 pt-7">
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
                            <p className="mt-4">
                                Let&apos;s tackle those challenges, boost your confidence, and
                                get you closer to your dream role! 🚀
                            </p>
                        </div>
                        <ExpertServices />
                    </TabsContent>
                    <TabsContent value='portfolio'>
                        <ExpertProtfolio />
                    </TabsContent>
                    <TabsContent value='reviews'>
                        <ExpertReviews />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
