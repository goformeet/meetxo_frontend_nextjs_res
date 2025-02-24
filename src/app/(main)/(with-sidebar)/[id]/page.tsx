import ExpertServices from "@/components/experts/expert-services";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hosts } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import { createCanvas, loadImage } from "canvas";
import AWS from "aws-sdk";
import Image from "next/image";
import { notFound } from "next/navigation";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function uploadToS3(buffer: Buffer, key: string): Promise<string> {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
    Body: buffer,
    ContentType: "image/png",
    ACL: "public-read",
  };

  await s3.upload(params).promise();
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

async function checkIfImageExists(key: string): Promise<boolean> {
  try {
    await s3
      .headObject({ Bucket: process.env.AWS_S3_BUCKET_NAME!, Key: key })
      .promise();
    return true;
  } catch {
    return false;
  }
}

type Expert = {
  profile_image: string;
  username: string;
}

async function generateOgImage(expert: Expert): Promise<Buffer> {
  const width = 1200;
  const height = 627;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const baseImage = await loadImage(
    "https://res.cloudinary.com/djocenrah/image/upload/v1740234119/og_profile_s4prh0.png"
  );
  ctx.drawImage(baseImage, 0, 0, width, height);

  const profileImage = await loadImage(expert.profile_image);
  const centerX = 265;
  const centerY = 315;
  const radius = 165;

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(profileImage, centerX - radius, centerY - radius, radius * 2, radius * 2);
  ctx.restore();

  ctx.font = "35px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(expert.username, 357, 590.5);

  return canvas.toBuffer("image/png");
}

type Params = Promise<{ id: string }>


export async function generateMetadata({ params }: {params: Params}): Promise<Metadata> {
  const id = decodeURIComponent((await params).id);
  const res = await Hosts({ search: id });

  if (!res.success || !res.hosts.hosts[0]) {
    return {
      title: "Expert Not Found",
      description: "The requested expert could not be found.",
    };
  }

  const expert = res.hosts.hosts[0];
  const ogKey = `og_images/${expert.username}.png`;
  let ogImageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${ogKey}`;

  if (!(await checkIfImageExists(ogKey))) {
    const buffer = await generateOgImage(expert);
    ogImageUrl = await uploadToS3(buffer, ogKey);
  }

  return {
    title: `Schedule and meet with ${expert.name} on meetxo.ai`,
    description: `Check out ${expert.name}, a top ${expert.profession_id?.title} expert on MeetXO. Book a session now!`,
    metadataBase: new URL("https://meetxo.ai"),
    openGraph: {
      title: `Schedule and meet with ${expert.name} on meetxo.ai`,
      description: `Check out ${expert.name, expert.username}, a top ${expert.profession_id?.title} expert on MeetXO. Book a session now!`,
      images: [{
        url: ogImageUrl,
        width: 1200,
        height: 627,
        alt: `${expert.name}'s Profile Picture`,
      }],
    },
  };
}

export default async function Page({ params }: {params: Params}) {
  const id = decodeURIComponent((await params).id);
  const res = await Hosts({ search: id });

  if (!res.success || !res.hosts.hosts[0]) {
    return notFound();
  }

  const data = res.hosts.hosts[0];
  const tabHeaders = [{ title: "Overview", value: "overview" }];

  return (
    <div className="flex-grow mx-4 md:mx-7 lg:mx-10">
      <div className="relative pb-20 md:pb-[110px]">
        <Image 
          src={data?.cover_image || "https://res.cloudinary.com/djocenrah/image/upload/v1739182656/Untitled_design_33_esnuv5.png"}
          alt="Expert cover image"
          width={1318}
          height={180}
          className="w-full h-28 md:h-[180px] object-cover object-center"
        />

        <div className="flex flex-col md:flex-row gap-2 md:gap-4 absolute bottom-0 md:left-8 md:items-center">
          <Avatar className="h-20 w-20 md:h-[190px] md:w-[190px] border-4 border-background">
            <AvatarImage
              src={data.profile_image}
              className="object-cover object-center"
            />
            <AvatarFallback>
              <Skeleton className="h-full w-full rounded-full" />
            </AvatarFallback>
          </Avatar>

          <div className="md:mt-16 flex-shrink-0">
            <h1 className="text-base md:text-[31px]/9 font-bold">{data?.name}</h1>
            <p className="md:mt-1 text-sm md:text-lg/7">
              {data?.profession_sub_category_id?.title}
            </p>
          </div>
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
              <ExpertServices
                id={data.user_id._id}
                username={data.username}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
