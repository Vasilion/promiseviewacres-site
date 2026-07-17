import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Static sitemap of the publicly navigable routes. Hidden routes
 * (/beyond-organic-gardening, /resources) are intentionally excluded — they
 * return notFound() and should not be advertised to crawlers.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/our-story", priority: 0.8, changeFrequency: "monthly" },
    { path: "/journey", priority: 0.8, changeFrequency: "daily" },
    { path: "/gallery", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  ];

  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
