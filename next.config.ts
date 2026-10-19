import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // ~30 pages need few build workers; one per CPU core runs low-RAM machines out of memory.
    cpus: 2,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
