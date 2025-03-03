import MeetBooking from "@/components/booking/meet-booking";
import { Metadata } from "next";



export async function generateMetadata({ params }: {params: Params}): Promise<Metadata> {
  const id = decodeURIComponent((await params).id);



  return {
    title: `${id}`,
    description: "Connect with the world's most in-demand experts for 1-on-1 guidance. Ask questions, get expert advice, and grow with personalized insights.",
    metadataBase: new URL("https://meetxo.ai"),
    openGraph: {
      title: `${id}`,
      description: "Connect with the world's most in-demand experts for 1-on-1 guidance. Ask questions, get expert advice, and grow with personalized insights.",
      images: [{
        url: "/og_image.png",
        width: 1200,
        height: 627,
        alt: "MeetXO Logo",
      }],
    },
  };
}

export default function Page()
{
return (
  <>
    <div className="px-4 md:px-7 lg:px-10 w-full relative flex flex-col justify-between">
      <MeetBooking />
    </div>
  </>
);
}
