import ExpertsList from "@/components/experts/expert-catogory-list";
import { Hosts } from "@/services/api";

const CATEGORY_NAME = "Trainers";
const PROFESSION_ID = "678b900486062ddce62be67c";


export const metadata = {
  title: "MeetXO Trainers – Enhance Your Skills with Expert Training",
  description:
    "Find professional trainers on MeetXO to help you improve your skills, fitness, and knowledge across various industries. Connect with top trainers today.",
  keywords: "MeetXO trainers, professional trainers, skill development, personal training, corporate training, fitness trainers, industry experts, expert training MeetXO, career training",
  metadataBase: new URL("https://meetxo.ai"),
  openGraph: {
    title: "MeetXO Trainers – Enhance Your Skills with Expert Training",
    description:
      "Find professional trainers on MeetXO to help you improve your skills, fitness, and knowledge across various industries. Connect with top trainers today.",
    url: "https://meetxo.ai/trainers",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "MeetXO Trainers",
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
