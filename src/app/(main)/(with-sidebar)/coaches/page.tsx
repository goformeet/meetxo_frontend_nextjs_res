import ExpertsList from "@/components/experts/expert-catogory-list";
import { Hosts } from "@/services/api";

const CATEGORY_NAME = "Coaches";
const PROFESSION_ID = "678b8f8c86062ddce62be67a";


export const metadata = {
  title: "MeetXO Coaches – Expert Coaching for Personal & Professional Growth",
  description:
    "Find expert coaches on MeetXO to enhance your skills, career, and personal development. Connect with certified professionals across various domains.",
  keywords: "MeetXO coaches, professional coaching, expert coaching, personal development coaches, career coaching, life coaching, business coaching, skill development, mentorship MeetXO, certified coaches",
  metadataBase: new URL("https://meetxo.ai"),
  openGraph: {
    title: "MeetXO Coaches – Expert Coaching for Personal & Professional Growth",
    description:
      "Find expert coaches on MeetXO to enhance your skills, career, and personal development. Connect with certified professionals across various domains.",
    url: "https://meetxo.ai/coaches",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "MeetXO Coaches",
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
