import TeamImage from "@/components/team-image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Team = () => {
    // Declare image locations as constants
    const images = {
        saurav: "/images/team/saurav-sir.png",
        prashob: "/images/team/prashob-sir.png",
        shashank: "/images/team/sashank-sir.png",
        prajwal: "/images/team/Prajwal.png",
        ritu: "/images/team/ritu.png",
        surya: "/images/team/suryaa.png",
                abhishek: "/images/team/Abhishek.png",
        vishwa: "/images/team/vishwa.png",
        tejas: "/images/team/Tejas.png",

    };

    return (
        <main className="py-20 px-4 md:px-7 lg:px-10">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl text-center mb-8 font-bold">
                Meet Our <span className="text-primary">Team</span>
            </h1>

            {/* First Row with 2 Members, Centered */}
            <div className="flex justify-center mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <TeamImage
                        name="Saurav Kumar"
                        designation="Founder & CEO"
                        goformeet="https://www.goformeet.co/sauravkumar"
                        image={images.saurav}
                    />
                    <TeamImage
                        name="Prashob P"
                        designation="Co-Founder & CTO"
                        goformeet="https://goformeet.co/prashob"
                        image={images.prashob}
                    />
                </div>
            </div>

            {/* Second Row with 5 Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                <TeamImage
                    name="Shashank Chaurasia"
                    designation="Investor Relationship Manager"
                    goformeet=""
                    image={images.shashank}
                />
                <TeamImage
                    name="Prajwal"
                    designation="Founder's Office"
                    goformeet="https://www.goformeet.co/prajwal"
                    image={images.prajwal}
                />
                <TeamImage
                    name="Ritu"
                    designation="Social Media Manager"
                    goformeet="https://www.goformeet.co/ritu"
                    image={images.ritu}
                />
                <TeamImage
                    name="Surya"
                    designation="Video Editor"
                    goformeet="https://www.goformeet.co/surya"
                    image={images.surya}
                />





                 <TeamImage
                    name="Abhishek Kumar"
                    designation="Founders Office Intern"
                    goformeet="https://www.goformeet.co/surya"
                    image={images.abhishek}
                /> <TeamImage
                    name="Vishwa"
                    designation="Founders Office Intern"
                    goformeet="https://www.goformeet.co/surya"
                    image={images.vishwa}
                /> <TeamImage
                    name="Tejas"
                    designation="Founders Office Intern"
                    goformeet="https://www.goformeet.co/surya"
                    image={images.tejas}
                />

            


            </div>

            <div className="flex justify-center mt-10">
                <Link href="https://www.linkedin.com/company/meetxo/people/" target="_blank">
                    <Button
                        variant="outline"
                        className="border text-primary font-bold text-lg px-10 mx-auto"
                    >
                        View All Team Members
                    </Button>
                </Link>
            </div>
        </main>
    );
};

export default Team;
