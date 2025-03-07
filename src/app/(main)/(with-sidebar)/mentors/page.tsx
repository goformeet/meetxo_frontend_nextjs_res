

import ExpertsList from "@/components/experts/expert-catogory-list";
import { Hosts } from "@/services/api";

const CATEGORY_NAME = "Mentors";
const PROFESSION_ID = "678b8dd486062ddce62be676";


export const metadata = {
  title: "MeetXO Mentors – Get Expert Guidance & Mentorship",
  description:
    "Find experienced mentors on MeetXO to guide you through career decisions, business challenges, and skill development with personalized mentorship.",
  keywords: "MeetXO mentors, expert mentorship, career guidance, business mentors, industry experts, professional mentoring, leadership coaching, skill enhancement, one-on-one mentoring, mentorship program MeetXO",
  metadataBase: new URL("https://meetxo.ai"),
  openGraph: {
    title: "MeetXO Mentors – Get Expert Guidance & Mentorship",
    description:
      "Find experienced mentors on MeetXO to guide you through career decisions, business challenges, and skill development with personalized mentorship.",
    url: "https://meetxo.ai/mentors",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "MeetXO Mentors",
      },
    ],
  },
};


export default async function Page() {
  let experts = [];

  try {
    const response = await Hosts({ profession_id: PROFESSION_ID });
    experts = response.hosts?.hosts || [];
  } catch (error) {
    console.error(`Error fetching ${CATEGORY_NAME}:`, error);
  }

  return <ExpertsList experts={experts} category={CATEGORY_NAME} />;
}
