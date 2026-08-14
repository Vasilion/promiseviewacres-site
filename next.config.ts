import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't pick up a stray lockfile in the
  // home directory. Keeps Turbopack scoped to this project.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  // The ebook PDF lives outside `public/` (never web-served) but must be bundled
  // into the Stripe webhook's serverless function so it can be read + attached
  // to the delivery email at runtime.
  outputFileTracingIncludes: {
    "/api/stripe/webhook": ["./assets/ebook/**"],
  },
};

export default nextConfig;
