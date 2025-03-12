import MeetBooking from "@/components/booking/meet-booking";
// import { Metadata } from "next";



// type Params = Promise<{ id: string }>



// export async function generateMetadata({
//   params,
// }: {
//   params: Params;
// }): Promise<Metadata> {
//   const id = decodeURIComponent((await params).id);
 


//   const ogKey = `og_images/${id}.png`;
//   const ogImageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${ogKey}`;

//   return {
//     title: "Connect with the world's most in-demand experts for 1-on-1 guidance",
//     // title: `${service}`,
//     description:
//       "Connect with the world's most in-demand experts for 1-on-1 guidance. Ask questions, get expert advice, and grow with personalized insights.",
//     metadataBase: new URL("https://meetxo.ai"),
//     openGraph: {
//       title:
//         "Connect with the world's most in-demand experts for 1-on-1 guidance",
//       description:
//         "Connect with the world's most in-demand experts for 1-on-1 guidance. Ask questions, get expert advice, and grow with personalized insights.",
//       images: [
//         {
//           url: ogImageUrl,
//           width: 1200,
//           height: 627,
//           alt: "MeetXO Logo",
//         },
//       ],
//     },
//   };
// }

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
