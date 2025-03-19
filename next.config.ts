import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "pupg9bg1u4.ufs.sh",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**"
      },
    ]
  }
};

export default nextConfig;
