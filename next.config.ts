import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["loremflickr.com"],
  },
};

export default nextConfig;
