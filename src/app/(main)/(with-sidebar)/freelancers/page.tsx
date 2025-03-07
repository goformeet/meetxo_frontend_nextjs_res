import ExpertsList from "@/components/experts/expert-catogory-list";
import { Hosts } from "@/services/api";

const CATEGORY_NAME = "Freelancers";
const PROFESSION_ID = "678b95e986062ddce62be689";


export const metadata = {
  title: "MeetXO Investors – Connect with Top Investors & Venture Capitalists",
  description:
    "Find and connect with experienced investors on MeetXO. Get funding, business insights, and mentorship from venture capitalists and angel investors.",
  keywords: "MeetXO investors, startup funding, venture capital, angel investors, business investment, fundraising MeetXO, investor marketplace, startup investors, finance experts",
  metadataBase: new URL("https://meetxo.ai"),
  openGraph: {
    title: "MeetXO Investors – Connect with Top Investors & Venture Capitalists",
    description:
      "Find and connect with experienced investors on MeetXO. Get funding, business insights, and mentorship from venture capitalists and angel investors.",
    url: "https://meetxo.ai/investors",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "MeetXO Investors",
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
