import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "lh4.googleusercontent.com",
      "lh5.googleusercontent.com",
      "lh6.googleusercontent.com",
    ],
    remotePatterns: [
      new URL('https://7ec1rjem3s1walis.public.blob.vercel-storage.com/**'),
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    }
  }
};

export default nextConfig;
