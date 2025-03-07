
import ExpertsList from "@/components/experts/expert-catogory-list";
import { Hosts } from "@/services/api";

const CATEGORY_NAME = "Entrepreneurs";
const PROFESSION_ID = "678b94b086062ddce62be684";

export const metadata = {
  title: "MeetXO Entrepreneurs – Learn from Industry Leaders & Founders",
  description:
    "Connect with successful entrepreneurs on MeetXO for insights, mentorship, and guidance on business growth, startups, and innovation.",
  keywords: "MeetXO entrepreneurs, startup founders, business mentorship, entrepreneurship advice, industry leaders, business strategy, startup coaching, venture capital, innovation experts, business networking MeetXO",
  metadataBase: new URL("https://meetxo.ai"),
  openGraph: {
    title: "MeetXO Entrepreneurs – Learn from Industry Leaders & Founders",
    description:
      "Connect with successful entrepreneurs on MeetXO for insights, mentorship, and guidance on business growth, startups, and innovation.",
    url: "https://meetxo.ai/entrepreneurs",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "MeetXO Entrepreneurs",
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
    console.error(`Error fetching ${CATEGORY_NAME}s:`, error);
  }

  return <ExpertsList experts={experts} category={CATEGORY_NAME} />;
}
