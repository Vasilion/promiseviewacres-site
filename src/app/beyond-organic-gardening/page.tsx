import { notFound } from "next/navigation";

// Beyond Organic Gardening page is HIDDEN for now (also removed from nav in site.ts).
// To re-enable: restore the real page component from git history
// (the full implementation lives in the commit before this one) and add the
// nav item back to `site.nav`:
//   { label: "Beyond Organic Gardening", href: "/beyond-organic-gardening" }
// The `beyondOrganic` content object is still present in src/content/site.ts.
export default function BeyondOrganicPage() {
  notFound();
}
