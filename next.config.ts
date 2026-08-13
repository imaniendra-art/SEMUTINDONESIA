import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  poweredByHeader: false,
  images: {
    // Allow images from same origin (uploads) and any https source
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true, // Safe for self-hosted / SQLite deployments
  },
};

export default nextConfig;
