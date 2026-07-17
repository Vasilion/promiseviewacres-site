/**
 * SEO helpers — canonical site URL + shared metadata building blocks.
 *
 * The origin is env-driven (NEXT_PUBLIC_SITE_URL) so the same build can point
 * at the Amplify preview URL in testing and the live domain in production.
 */
import { site } from "@/content/site";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://promiseviewacres.com"
).replace(/\/$/, "");

/** Build an absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const SITE_NAME = site.name;
export const SITE_TITLE =
  "Promise View Acres — Rooted in Faith. Growing in Stewardship.";
export const SITE_DESCRIPTION =
  "A faith-centered homestead on 21 acres in Michigan. We document the beauty, challenges, and lessons of building a life rooted in Christ — through YouTube, photos, and the stories of Promise View Acres.";
