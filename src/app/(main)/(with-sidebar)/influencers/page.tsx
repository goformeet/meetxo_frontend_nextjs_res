import ExpertsList from "@/components/experts/expert-catogory-list";
import { Hosts } from "@/services/api";

const CATEGORY_NAME = "Influencers";
const PROFESSION_ID = "678b8f0586062ddce62be678";

export const metadata = {
  title: "MeetXO Influencers – Connect with Top Influencers",
  description:
    "Discover and collaborate with leading influencers on MeetXO’s expert marketplace. Find professionals across industries for brand partnerships, insights, and guidance.",
  keywords: "MeetXO influencers, top influencers MeetXO, influencer marketplace, social media influencers, MeetXO experts, brand partnerships, influencer consultation, online influencers, digital creators, content creators MeetXO, influencer marketing",
  metadataBase: new URL("https://meetxo.ai"),
  openGraph: {
    title: "MeetXO Influencers – Connect with Top Influencers",
    description:
      "Discover and collaborate with leading influencers on MeetXO’s expert marketplace. Find professionals across industries for brand partnerships, insights, and guidance.",
    url: "https://meetxo.ai/influencers",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "MeetXO Influencers",
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
