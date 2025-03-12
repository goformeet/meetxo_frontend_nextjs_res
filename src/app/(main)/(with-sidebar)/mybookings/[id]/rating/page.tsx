import Link from "next/link";
import {ArrowLeft, Star} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";

export default function Page(){
    return (
        <div className="px-4 md:px-7 lg:px-10 py-5">
            <div className="flex items-center gap-1.5">
                <Link href="/mybookings">
                    <ArrowLeft height={22} width={32} />
                </Link>
                <h1 className="text-base md:text-xl font-bold">Rating</h1>
            </div>
            <div className="my-8 lg:pl-6">
                <div className="mb-14">
                    <div className="flex gap-3 items-center">
                        <Avatar className="bg-muted h-[66px] w-[66px]">
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
                        </div>
                    </div>
                </div>
                <table className="text-sm leading-6 w-full max-w-[1016px] border-separate" style={{ borderSpacing: "0 1.5rem" }}>
                    <tbody>
                    <tr className="align-top">
                        <td className="font-medium text-muted-foreground pr-4 md:whitespace-nowrap">Session About</td>
                        <td className="text-foreground">
                            Figma ipsum component variant main layer. Flatten connection project scrolling arrange connection subtract community bold. Line flatten align component group image. Move create follower main arrange prototype background layer inspect. Shadow community pen clip subtract frame group main vector. Polygon underline font device ellipse pen flows project main star.
                        </td>
                    </tr>
                    </tbody>
                </table>
            <div className="py-[22px] px-[50px] rounded-[16px] border border-muted w-fit">
                <p className="font-bold pb-6">Provide Rating</p>
                <div className="flex items-center gap-[50px]">
                    <Star height={50} width={50} color="#FFB459" strokeWidth={1.5}/>
                    <Star height={50} width={50} color="#FFB459" strokeWidth={1.5}/>
                    <Star height={50} width={50} color="#FFB459" strokeWidth={1.5}/>
                    <Star height={50} width={50} color="#FFB459" strokeWidth={1.5}/>
                    <Star height={50} width={50} color="#FFB459" strokeWidth={1.5}/>
                </div>

            </div>
            </div>
        </div>
    )
}