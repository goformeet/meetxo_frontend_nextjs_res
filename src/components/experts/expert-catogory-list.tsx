"use client";
import React, { useState } from "react";
import ExpertCard from "@/components/expert-card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type Professional = {
  _id: string;
  name: string;
  profile_image: string;
  min_session_price: string;
  average_rating: number;
  about_me: string;
  username: string;
  profession_id: {
    title: string;
  };
};

interface ExpertsListProps {
  experts: Professional[];
  category: string;
}

export default function ExpertsList({ experts, category }: ExpertsListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter experts based on search query
  const filteredExperts = experts.filter((expert) =>
    expert.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pl-5 py-5 pr-[35px] max-w-[calc(100%-105px)]">
      <h1 className="text-[22px]/[28px] font-bold">Find {category}</h1>

      {/* Search Box */}
      <div className="mt-6 flex py-[1px] px-6 items-center rounded-[38px] border border-[#F1F2F4]">
        <Image
          src="/icons/search-primary.svg"
          alt="Search Icon"
          width={18}
          height={18}
        />
        <Input
          type="text"
          placeholder={`Search ${category} by name`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-none focus-visible:ring-0 h-fit py-4 shadow-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Experts List */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">{category}s</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-x-5 md:gap-y-8">
          {filteredExperts.length > 0 ? (
            filteredExperts.map((prof) => (
              <ExpertCard key={prof._id} prof={prof} />
            ))
          ) : (
            <p className="col-span-full text-gray-500">No {category}s found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
