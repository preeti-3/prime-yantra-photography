import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    qualities: [85],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
  devIndicators: false,
};
export default nextConfig;
