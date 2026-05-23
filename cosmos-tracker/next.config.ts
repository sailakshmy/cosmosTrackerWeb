import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://apod.nasa.gov/**")],
  },
};

export default nextConfig;
