import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: { unoptimized: true, qualities: [85], formats: ["image/webp"] },
  devIndicators: false,
};
export default nextConfig;
