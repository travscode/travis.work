import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Short, shareable link for the one-time audit
  async redirects() {
    return [{ source: "/seo-audit", destination: "/services/seo-audit", permanent: true }];
  },
};

export default nextConfig;
