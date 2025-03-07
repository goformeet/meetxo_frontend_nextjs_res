import ExpertsList from "@/components/experts/expert-catogory-list";
import { Hosts } from "@/services/api";

const CATEGORY_NAME = "Astrologers";
const PROFESSION_ID = "67bf3bab2facb10efa143af7";


export const metadata = {
  title: "MeetXO Astrologers – Get Expert Astrology Guidance & Readings",
  description:
    "Consult experienced astrologers on MeetXO for accurate predictions, horoscopes, and life guidance. Get insights into career, love, and personal growth.",
  keywords: "MeetXO astrologers, astrology readings, horoscope consultations, online astrologers, Vedic astrology, tarot reading, spiritual guidance, astrology experts MeetXO, numerology",
  metadataBase: new URL("https://meetxo.ai"),
  openGraph: {
    title: "MeetXO Astrologers – Get Expert Astrology Guidance & Readings",
    description:
      "Consult experienced astrologers on MeetXO for accurate predictions, horoscopes, and life guidance. Get insights into career, love, and personal growth.",
    url: "https://meetxo.ai/astrologers",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "MeetXO Astrologers",
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
