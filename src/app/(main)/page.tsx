import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image";


export default function Home() {
  return (
    <main className="px-4 md:px-7 lg:px-10">
      <section className="bg-[url('/images/home-banner-bg.png')] bg-cover bg-center hidden md:block">
        <div className="pt-28 flex flex-col justify-center items-center">
          <Tabs defaultValue="tab-1" className="">
            <TabsList className="h-full bg-[rgba(10,_102,_194,_0.25)] rounded-[70px] p-1.5 flex justify-center max-w-fit mx-auto">
              <TabsTrigger className="text-primary data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-3 rounded-[70px] font-plus-jakarta-sans text-sm font-bold" value="tab-1">Join as Expert</TabsTrigger>
              <TabsTrigger className="text-primary data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-3 rounded-[70px] font-plus-jakarta-sans text-sm font-bold" value="tab-2">Find Expert</TabsTrigger>
            </TabsList>
            <div className="mt-6 border border-[#F1F1F3] dark:border-[#2A2A2E] bg-[#FCFCFD] dark:bg-[#18181B] px-5 py-[14px] rounded-[11px] flex items-center gap-2.5 relative">
              <div className="absolute -left-7 -top-[30px]">
                <Image src={'/images/abstract-line.svg'} width={39} height={43} alt="abstract line" />
              </div>
              <div className="p-[14px] bg-[#EBF5FF] rounded-[6px]">
                <Image src={'/images/thunder.svg'} width={34} height={34} alt="thunder" />
              </div>
              <h1 className="text-xl md:text-4xl lg:text-5xl font-semibold leading-normal font-plus-jakarta-sans"><span className="text-primary">Unlock</span> Your Creative Potential</h1>
            </div>
            <div className="mt-7">
              <p className="text-center text-[30px] font-medium leading-[150%]">
                Accelerate your success with expert mentorship.
              </p>
              <p className="mt-2.5 text-center text-lg leading-normal">
                Learn from Industry Experts and Enhance Your Skills.
              </p>
            </div>
            <TabsContent className="" value="tab-1">

            </TabsContent>
            <TabsContent className="" value="tab-2">

            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
