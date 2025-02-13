import Image from "next/image";
import Link from "next/link";
import React from "react";

interface personDetails {
    name: string;
    goformeet: string;
    designation: string;
    image?: string;
}

const TeamImage = ({ name, designation, image }: personDetails) => {
    return (
        <Link href={''}>
            <div className="team-photo-container">
                <div className="dp">
                    <div className="wrapper">
                        <div className="linkedin text-white z-10 flex items-center">
                            <span className="mb-1">Meet via <span className="font-bold">MeetXO</span></span>
                        </div>
                        {image && (
                            <Image src={image} alt="person image" className="absolute top-[1px] left-[0px]" height={250} width={250} />
                        )}
                    </div>
                </div>
                <span className="name">{name}</span>
                <span>{designation}</span>
            </div>
        </Link>
    );
};

export default TeamImage;