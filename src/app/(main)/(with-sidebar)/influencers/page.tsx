import ExpertsList from "@/components/experts/expert-catogory-list";
import { Hosts } from "@/services/api";

const CATEGORY_NAME = "Influencers";
const PROFESSION_ID = "678b8f0586062ddce62be678";

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
