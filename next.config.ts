import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/news", destination: "/media-center/news", permanent: true },
      {
        source: "/news/:slug",
        destination: "/media-center/:slug",
        permanent: true,
      },
      {
        source: "/zh/news",
        destination: "/zh/media-center/news",
        permanent: true,
      },
      {
        source: "/zh/news/:slug",
        destination: "/zh/media-center/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
