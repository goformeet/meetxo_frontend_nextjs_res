import Dot from '@/components/dot';
import ExpertServices from '@/components/experts/expert-services';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import { TabsTrigger } from '@radix-ui/react-tabs'
import Image from 'next/image';
import React from 'react'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    // const id = (await params).id; 
    const tabHeaders = [
        {
            title: 'Overview',
            value: 'overview'
        },
        {
            title: 'Portfolio',
            value: 'portfolio'
        },
        {
            title: 'Reviews',
            value: 'reviews'
        },
    ];

    const skills = ['UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design', 'UI/UX Design',]

    return (
        <div className='flex-grow pr-[35px] max-w-[calc(100%-103.45px)]'>
            <div className="pl-5 flex gap-[18px] items-end bg-[url('/images/expert-bg.png')] bg-no-repeat bg-top bg-cover bg-background pt-[104px]" style={{ backgroundSize: '100% 180px' }}>
                <Avatar className='h-[190px] w-[190px] border-4 border-background'>
                    <AvatarImage src={'/images/avatar.svg'} />
                    <AvatarFallback className='bg-[#E3E6EA] dark:bg-muted-foreground'>CN</AvatarFallback>
                </Avatar>
                <div className='mb-9'>
                    <h1 className='text-[31px]/9 font-bold'>Pristia Kanisn</h1>
                    <p className='mt-1 text-lg/7'>Peincipal Designer</p>
                </div>
            </div>
            <div className='pl-5 pt-7'>
                <Tabs defaultValue='overview'>
                    <TabsList className='gap-[36px] bg-background border-b w-full h-fit px-0 py-0 justify-start rounded-none'>
                        {tabHeaders.map((tab) => (
                            <TabsTrigger className='data-[state=active]:text-primary border-b-[3px] border-transparent data-[state=active]:border-primary text-[15px]/[25px] font-medium py-2' key={tab.value} value={tab.value}>
                                {tab.title}
                                {tab.value == 'reviews' && (
                                    <span className='inline-flex ml-2 bg-primary text-white justify-center items-center rounded-full px-2.5'>19</span>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value='overview'>
                        <div className='py-4 px-6 mt-6 rounded-[16px] border border-[#F1F2F4] text-lg/8 font-medium'>
                            <p>👋 Hi, I&apos;m Rishabh Gaurav, currently an MTS at Oracle India. I specialize in Data Structures and Algorithms, interview prep, and strategies to crack roles in top product-based companies. Whether you&apos;re gearing up for interviews, aiming for a referral, or sharpening your coding skills, I'm here to guide you every step of the way.</p>
                            <p className='mt-4'>Let&apos;s tackle those challenges, boost your confidence, and get you closer to your dream role! 🚀</p>
                        </div>
                        <ExpertServices />
                    </TabsContent>
                    <TabsContent value='portfolio'>
                        <div className='max-w-[834px]'>
                            <div className='p-4 rounded-[16px] border border-[#E0E0E0] flex flex-col gap-10 mb-6'>
                                <h2 className='text-[32px]/[120%] font-medium'>Skills</h2>
                                <div className='flex items-center flex-wrap gap-2'>
                                    {
                                        skills.map((skill, index) => (
                                            <div key={index} className='px-3 py-1 flex justify-center items-center border border-[#E0E0E0] rounded-full'>
                                                <p className='text-center text-base/[150%]'>{skill}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='p-4 rounded-[16px] border border-[#E0E0E0] flex flex-col gap-7 mb-6'>
                                <h2 className='text-[32px]/[120%] font-medium'>Experiences</h2>
                                <div className=''>
                                    {
                                        Array.from({ length: 3 }, (_, index) => (
                                            <div key={index} className='flex items-start gap-6 border-b border-[#E0E0E0] last:border-b-0'>
                                                <Image src={'/images/company-logo.svg'} alt="Comapny Logo" width={64} height={64} />
                                                <div>
                                                    <p className='text-lg/[130%] font-medium mb-2'>UI/UX Design</p>
                                                    <div className='flex gap-2 items-center mb-2'>
                                                        <p className='text-[#7C7C7C] text-base/[150%] font-normal'>EdTech</p>
                                                        <Dot />
                                                        <p className='text-[#7C7C7C] text-base/[150%] font-normal'>Full-Time</p>
                                                        <Dot />
                                                        <p className='text-[#7C7C7C] text-base/[150%] font-normal'>Jul 200 - Present (1y 2m)</p>
                                                    </div>
                                                    <p className='text-[#7C7C7C] text-base/[150%] font-normal mb-4'>Tokyo, Japan</p>
                                                    <p className='text-base/[150%] text-foreground mb-[24px]'>Created and executed website for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    </div>
                            </div>

                        </div>
                    </TabsContent>
                    
                </Tabs>
            </div>
        </div>
    )
}
