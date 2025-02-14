import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
    { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "media.licdn.com" },
<<<<<<< Updated upstream
      { protocol: "https", hostname: "cdn.example.com" },
      { protocol: "https", hostname: "**.cloudinary.com" },
      { protocol: "https", hostname: "goformeet.s3.ap-south-1.amazonaws.com" }, 
      { protocol: "https", hostname: "www.goformeet.co" }, 
=======
      { protocol: "https", hostname: "cdn.example.com" }, 
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: 'https', hostname: "**"}
>>>>>>> Stashed changes
    ],
  },
};

export default nextConfig;
