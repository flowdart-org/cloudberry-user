import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudberrybucket.blob.core.windows.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
