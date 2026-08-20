import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Your API port
        pathname: "/api/images/**", // Path to your images served via the API
      },
    ],
  },
};

export default nextConfig;
