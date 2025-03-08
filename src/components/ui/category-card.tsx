import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryCard({
  category,
}: {
  category: {
    _id: string;
    title: string;
    image: string;
    description: string;
  };
}) {
  return (
    <Link
      href={`/${category.title.toLowerCase().replace(/\s+/g, "-")}`}
      passHref
    >
      <div className="rounded-[18px] shadow-[0px_8px_30px_0px_rgba(80,85,136,0.06)] py-2 px-3 bg-background flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-200 h-full">
        {/* Image Section */}
        <div className="relative aspect-[287/150] w-full">
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="rounded-[10px] object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col flex-grow mt-[14px]">
          <p className="text-sm font-semibold leading-normal">
            {category.title}
          </p>
          <p className="text-xs/[19px] tracking-[0.06px] text-[#384853] dark:text-[#A8B4C0]/90 mt-1.5 line-clamp-3">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
