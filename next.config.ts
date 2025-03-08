
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "cdn.example.com" },
      { protocol: "https", hostname: "**.cloudinary.com" },
      { protocol: "https", hostname: "goformeet.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "www.goformeet.co" },
      { protocol: "https", hostname: "www.maacgp.com" },
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com" },
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ],
  },
};

export default nextConfig;
