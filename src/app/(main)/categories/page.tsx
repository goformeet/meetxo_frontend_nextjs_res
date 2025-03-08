import { Professions } from "@/services/api";
import { notFound } from "next/navigation";
import CategoryCard from "@/components/category-card";

type Category = {
  _id: string;
  title: string;
  image: string;
  description: string;
};

export const metadata = {
  title: "Expert Categories – Find Top Experts on MeetXO",
  description:
    "Discover a diverse range of experts on MeetXO. Connect with professionals across various fields for insightful and productive meetings.",
  keywords:
    "MeetXO experts, expert categories, professional advice, business experts, tech experts, coaching, mentorship, industry specialists, expert consultations, skill development",
  metadataBase: new URL("https://meetxo.ai"),
  openGraph: {
    title: "Expert Categories – Find Top Experts on MeetXO",
    description:
      "Discover a diverse range of experts on MeetXO. Connect with professionals across various fields for insightful and productive meetings.",
    url: "https://meetxo.ai/categories",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "MeetXO Experts",
      },
    ],
  },
};

export default async function Page() {
  const data = await Professions();

  const professions = data["professions"];

  if (!professions || !professions.length) {
    console.log(professions);
    notFound();
  }

  return (
    <main className="px-4 md:px-7 lg:px-10 pb-20 pt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-lg/5 md:text-[22px]/[28px] font-bold ">
          Expert Categories - Discover a diverse range of experts on MeetXO
        </h1>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5">
        {professions.map((category: Category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </main>
  );
}
