import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import {ArrowRight, Star} from "lucide-react";

export default function page () {
    return (
        <div className="px-4 md:px-7 lg:px-10 py-5">
            <h1 className="text-base md:text-xl font-bold">My Bookings</h1>
            <div className="my-4">
                <Tabs defaultValue="tab-1">
                    <TabsList className="bg-background gap-2 md:gap-5 rounded-[8px] border border-[#F1F2F4] w-full justify-evenly md:justify-start">
                        <TabsTrigger value="tab-1" className="group data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none shadow-none">
                            <div className="flex gap-1.5 items-center">
                                <svg className="hidden md:block" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Frame">
                                        <path id="Vector"
                                              d="M11.2354 6.01172C11.2354 6.01172 11.6104 6.38672 11.9854 7.13672C11.9854 7.13672 13.1765 5.26172 14.2354 4.88672"
                                              className="stroke-muted-foreground group-data-[state=active]:stroke-[#0A66C2]"
                                              strokeWidth="1.2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                        />
                                        <path id="Vector_2"
                                              d="M7.49614 2.26556C5.62229 2.18623 4.17459 2.40209 4.17459 2.40209C3.26045 2.46746 1.5086 2.97995 1.50861 5.97296C1.50863 8.94053 1.48923 12.599 1.50861 14.0575C1.50861 14.9486 2.06033 17.027 3.96995 17.1384C6.29108 17.2739 10.4721 17.3027 12.3903 17.1384C12.9039 17.1095 14.6135 16.7063 14.8299 14.8463C15.054 12.9193 15.0094 11.5801 15.0094 11.2613"
                                              className="stroke-muted-foreground group-data-[state=active]:stroke-[#0A66C2]"
                                              strokeWidth="1.2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                        />
                                        <path id="Vector_3"
                                              d="M16.5004 6.01172C16.5004 8.08278 14.8198 9.76175 12.7468 9.76175C10.6737 9.76175 8.99316 8.08278 8.99316 6.01172C8.99316 3.94065 10.6737 2.26172 12.7468 2.26172C14.8198 2.26172 16.5004 3.94065 16.5004 6.01172Z"
                                              className="stroke-muted-foreground group-data-[state=active]:stroke-[#0A66C2]"
                                              strokeWidth="1.2"
                                              strokeLinecap="round"
                                        />
                                        <path id="Vector_4"
                                              d="M5.23535 10.5117H8.23533"
                                              className="stroke-muted-foreground group-data-[state=active]:stroke-[#0A66C2]"
                                              strokeWidth="1.2"
                                              strokeLinecap="round"
                                        />
                                        <path id="Vector_5"
                                              d="M5.23535 13.5117H11.2353"
                                              className="stroke-muted-foreground group-data-[state=active]:stroke-[#0A66C2]"
                                              strokeWidth="1.2"
                                              strokeLinecap="round"
                                        />
                                    </g>
                                </svg>
                                <p className="text-sm md:text-base font-medium group-data-[state=active]:text-primary">Ongoing Meetings</p>
                            </div>
                        </TabsTrigger>
                        <TabsTrigger value="tab-2" className="group data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none shadow-none">
                            <div className="flex gap-1.5 items-center">
                                <svg className="hidden md:block" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Frame">
                                        <path id="Vector"
                                              d="M11.2354 6.01172C11.2354 6.01172 11.6104 6.38672 11.9854 7.13672C11.9854 7.13672 13.1765 5.26172 14.2354 4.88672"
                                              className="stroke-muted-foreground group-data-[state=active]:stroke-[#0A66C2]"
                                              strokeWidth="1.2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                        />
                                        <path id="Vector_2"
                                              d="M7.49614 2.26556C5.62229 2.18623 4.17459 2.40209 4.17459 2.40209C3.26045 2.46746 1.5086 2.97995 1.50861 5.97296C1.50863 8.94053 1.48923 12.599 1.50861 14.0575C1.50861 14.9486 2.06033 17.027 3.96995 17.1384C6.29108 17.2739 10.4721 17.3027 12.3903 17.1384C12.9039 17.1095 14.6135 16.7063 14.8299 14.8463C15.054 12.9193 15.0094 11.5801 15.0094 11.2613"
                                              className="stroke-muted-foreground group-data-[state=active]:stroke-[#0A66C2]"
                                              strokeWidth="1.2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                        />
                                        <path id="Vector_3"
                                              d="M16.5004 6.01172C16.5004 8.08278 14.8198 9.76175 12.7468 9.76175C10.6737 9.76175 8.99316 8.08278 8.99316 6.01172C8.99316 3.94065 10.6737 2.26172 12.7468 2.26172C14.8198 2.26172 16.5004 3.94065 16.5004 6.01172Z"
                                              className="stroke-muted-foreground group-data-[state=active]:stroke-[#0A66C2]"
                                              strokeWidth="1.2"
                                              strokeLinecap="round"
                                        />
                                        <path id="Vector_4"
                                              d="M5.23535 10.5117H8.23533"
                                              className="stroke-muted-foreground group-data-[state=active]:stroke-[#0A66C2]"
                                              strokeWidth="1.2"
                                              strokeLinecap="round"
                                        />
                                        <path id="Vector_5"
                                              d="M5.23535 13.5117H11.2353"
                                              className="stroke-muted-foreground group-data-[state=active]:stroke-[#0A66C2]"
                                              strokeWidth="1.2"
                                              strokeLinecap="round"
                                        />
                                    </g>
                                </svg>
                                <p className="text-sm md:text-base font-medium group-data-[state=active]:text-primary">Past Meetings</p>
                            </div>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab-1">
                        <div className="p-4 md:p-6 flex flex-col md:flex-row gap-3 justify-between rounded-[16px] border border-muted">
                            <div className="flex gap-3">
                                <Avatar className="bg-muted h-10 w-10">
                                    <AvatarImage />
                                    <AvatarFallback>
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-lg font-semibold">Mentorship <span className="text-muted-foreground">Session with</span> John Paul</h2>
                                    <div className="flex gap-3.5">
                                        <div className="flex gap-1.5 items-center">
                                            <Image src="/images/calander-muted.svg" alt="calander-icon" width={16} height={16} />
                                            <p className="text-sm text-muted-foreground">Jan 12, 2024</p>
                                        </div>
                                        <div className="flex gap-1.5 items-center">
                                            <Image src="/images/clock-muted.svg" alt="calander-icon" width={16} height={16} />
                                            <p className="text-sm text-muted-foreground">12:30 PM  - 1:30 PM</p>
                                        </div>
                                    </div>
                                    <Link href="/" className="flex items-center gap-1 text-primary text-sm font-semibold mt-4">
                                        <p>Join Now</p>
                                        <ArrowRight height={18} width={18} />
                                    </Link>
                                </div>
                            </div>
                            <Link href="/" className="text-sm font-bold text-right">View Details &gt; </Link>
                        </div>
                    </TabsContent>
                    <TabsContent value="tab-2">
                        <div className="p-4 md:p-6 flex flex-col md:flex-row gap-3 justify-between rounded-[16px] border border-muted max-w-[1064px]">
                            <div className="flex gap-3">
                                <Avatar className="bg-muted h-10 w-10">
                                    <AvatarImage />
                                    <AvatarFallback>
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-lg font-semibold">Mentorship <span className="text-muted-foreground">Session with</span> John Paul</h2>
                                    <div className="flex gap-3.5">
                                        <div className="flex gap-1.5 items-center">
                                            <Image src="/images/calander-muted.svg" alt="calander-icon" width={16} height={16} />
                                            <p className="text-sm text-muted-foreground">Jan 12, 2024</p>
                                        </div>
                                        <div className="flex gap-1.5 items-center">
                                            <Image src="/images/clock-muted.svg" alt="calander-icon" width={16} height={16} />
                                            <p className="text-sm text-muted-foreground">12:30 PM  - 1:30 PM</p>
                                        </div>
                                    </div>
                                   <p className="text-[#00C566] text-sm font-semibold mt-4">
                                       Completed
                                   </p>
                                </div>
                            </div>
                            <div className="flex flex-row-reverse md:flex-col justify-between items-end">
                                <Link href="/" className="text-sm font-bold">View Details &gt; </Link>
                                <div className="flex items-center gap-1.5">
                                    <Star height={16} width={16} color="#FFB459" fill="#FFB459" />
                                    <p className="text-[#FFB459] text-sm font-semibold">Rate this Session</p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}