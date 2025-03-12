import ExpertServices from "@/components/experts/expert-services";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hosts } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
// import { Metadata } from "next";
// import { createCanvas, loadImage } from "canvas";
// import AWS from "aws-sdk";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";

interface ApiSocialMediaLink {
  platform: string;
  url: string;
  _id: string;
}


// const s3 = new AWS.S3({
//   accessKeyId: process.env.EAWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.EAWS_SECRET_ACCESS_KEY,
//   region: process.env.EAWS_REGION,
// });
const socialMediaIcons = [
  {
    name: "Linkedin",
    icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
  },
  {
    name: "Instagram",
    icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
  },
  {
    name: "Facebook",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png",
  },
  {
    name: "X",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968830.png",
  },
  {
    name: "Youtube",
    icon: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
  },
  {
    name: "Github",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733609.png",
  },
  {
    name: "Behance",
    icon: "https://cdn-icons-png.flaticon.com/512/145/145799.png",
  },
  {
    name: "Tiktok",
    icon: "https://cdn-icons-png.flaticon.com/512/3046/3046124.png",
  },
];
// async function uploadToS3(buffer: Buffer, key: string): Promise<string> {
//   const params = {
//     Bucket: process.env.EAWS_S3_BUCKET_NAME!,
//     Key: key,
//     Body: buffer,
//     ContentType: "image/png",
//     ACL: "public-read",
//   };

//   await s3.upload(params).promise();
//   return `https://${process.env.EAWS_S3_BUCKET_NAME}.s3.${process.env.EAWS_REGION}.amazonaws.com/${key}`;
// }

// async function checkIfImageExists(key: string): Promise<boolean> {
//   try {
//     await s3
//       .headObject({ Bucket: process.env.EAWS_S3_BUCKET_NAME!, Key: key })
//       .promise();
//     return true;
//   } catch {
//     return false;
//   }
// }

// type Expert = {
//   profile_image: string;
//   username: string;
// }

// async function generateOgImage(expert: Expert): Promise<Buffer> {
//   const width = 1200;
//   const height = 627;
//   const canvas = createCanvas(width, height);
//   const ctx = canvas.getContext("2d");

//   const baseImage = await loadImage(
//     "https://res.cloudinary.com/djocenrah/image/upload/v1740234119/og_profile_s4prh0.png"
//   );
//   ctx.drawImage(baseImage, 0, 0, width, height);

//   const profileImage = await loadImage(expert.profile_image);
//   const centerX = 265;
//   const centerY = 315;
//   const radius = 165;

//   ctx.save();
//   ctx.beginPath();
//   ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
//   ctx.closePath();
//   ctx.clip();
//   ctx.drawImage(profileImage, centerX - radius, centerY - radius, radius * 2, radius * 2);
//   ctx.restore();

//   ctx.font = "35px Arial";
//   ctx.fillStyle = "white";
//   ctx.fillText(expert.username, 357, 590.5);

//   return canvas.toBuffer("image/png");
// }

type Params = Promise<{ id: string }>


// export async function generateMetadata({ params }: {params: Params}): Promise<Metadata> {
//   const id = decodeURIComponent((await params).id);
//   const res = await Hosts({ user_name: id });

//   if (!res.success || !res.hosts.hosts[0]) {
//     return {
//       title: "Expert Not Found",
//       description: "The requested expert could not be found.",
//     };
//   }

//   const expert = res.hosts.hosts[0];
//   const ogKey = `og_images/${expert.username}.png`;
//   let ogImageUrl = `https://${process.env.EAWS_S3_BUCKET_NAME}.s3.${process.env.EAWS_REGION}.amazonaws.com/${ogKey}`;

//   if (!(await checkIfImageExists(ogKey))) {
//     const buffer = await generateOgImage(expert);
//     ogImageUrl = await uploadToS3(buffer, ogKey);
//   }

//   return {
//     title: `Schedule and meet with ${expert.name} on meetxo.ai`,
//     description: `Check out ${expert.name}, a top ${expert.profession_id?.title} expert on MeetXO. Book a session now!`,
//     metadataBase: new URL("https://meetxo.ai"),
//     openGraph: {
//       title: `Schedule and meet with ${expert.name} on meetxo.ai`,
//       description: `Check out ${expert.name, expert.username}, a top ${expert.profession_id?.title} expert on MeetXO. Book a session now!`,
//       images: [{
//         url: ogImageUrl,
//         width: 1200,
//         height: 627,
//         alt: `${expert.name}'s Profile Picture`,
//       }],
//     },
//   };
// }

export default async function Page({ params }: {params: Params}) {
  const id = decodeURIComponent((await params).id);
  const res = await Hosts({ user_name: id });

  if (!res.success || !res.hosts.hosts[0]) {
    redirect("/")
  }

  const data = res.hosts.hosts[0];
  const apiSocialMediaLinks = res?.hosts?.hosts[0]?.social_media_links?res?.hosts?.hosts[0]?.social_media_links:[]
 const filteredSocialMedia = socialMediaIcons
   .filter((icon) =>
     apiSocialMediaLinks.some(
       (apiLink: ApiSocialMediaLink) => apiLink.platform === icon.name
     )
   )
   .map((icon) => ({
     ...icon,
     url:
       apiSocialMediaLinks.find(
         (apiLink: ApiSocialMediaLink) => apiLink.platform === icon.name
       )?.url || "#",
   }));


  const tabHeaders = [{ title: "Overview", value: "overview" }];

  return (
    <div className="flex-grow mx-4 md:mx-7 lg:mx-10">
      <div className="relative pb-20 md:pb-[110px]">
        <Image
          src={
            data?.cover_image ||
         "/Profile_banner.jpg"
          }
          alt="Expert cover image"
          width={1318}
          height={180}
          className="w-full h-28 md:h-[180px] object-cover object-center"
        />

        <div className="flex flex-col md:flex-row gap-2 md:gap-4 absolute bottom-0 md:left-8 md:items-center justify-between">
          <Avatar className="h-20 w-20 md:h-[190px] md:w-[190px] border-4 border-background">
            <AvatarImage
              src={data.profile_image}
              className="object-cover object-center"
            />
            <AvatarFallback>
              <Skeleton className="h-full w-full rounded-full" />
            </AvatarFallback>
          </Avatar>
          <div>

            
          </div>
          <div className="md:mt-16 flex-shrink-0">
            <h1 className="text-base md:text-[31px]/9 font-bold">
              {data?.name}
            </h1>
            <p className="md:mt-1 text-sm md:text-lg/7">
              {data?.profession_sub_category_id?.title}
            </p>
          </div>
        </div>
        <div className="absolute right-0 md:bottom-4 flex items-center gap-3">
          {filteredSocialMedia.map((social, index) => (
              <Link key={index} href={social.url} className="h-10 w-10 bg-primary-light rounded-full flex justify-center items-center">
                <Image src={social.icon} alt="linked in" width={40} height={40} className="h-[26px] w-[26px] object-contain object-center" />
              </Link>
          ))}
        </div>
      </div>

      <div className="pt-7">
        <Tabs defaultValue="overview">
          <TabsList className="gap-[36px] bg-background border-b w-full h-fit px-0 py-0 justify-start rounded-none">
            {tabHeaders.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:text-primary border-b-[3px] border-transparent data-[state=active]:border-primary text-[15px]/[25px] font-medium py-2"
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <div className="py-3 md:py-4 px-4 md:px-6 mt-4 md:mt-6 rounded-lg md:rounded-[16px] border border-[#F1F2F4] text-base/7 md:text-lg/8 font-medium">
              <p>{data?.about_me}</p>
            </div>

            {data?.user_id && (
              <ExpertServices id={data.user_id._id} username={data.username} />
            )}
          </TabsContent>
        </Tabs>
      </div>

           <div className="mt-10 text-sm text-gray-300">
        {/* <p>Keywords: {eventData?.keywords?.join(", ")}</p> */}
        <p>Keywords: MeetXO, One on One Meetings, Online Webinar, Offline Meetings, Events</p>

      </div>
    </div>
  );
}
