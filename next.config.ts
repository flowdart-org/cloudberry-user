import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cloudberryblobs.blob.core.windows.net",
                pathname: "/**",
            },
        ],
    },

    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
