import { notFound } from "next/navigation";

// Resources page is HIDDEN for now (removed from nav in site.ts).
// To re-enable: restore the ComingSoon (or real content) block below and
// add the nav item back to `site.nav`.
export default function ResourcesPage() {
  notFound();
}

/*
import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Resources — Promise View Acres",
  description: "Tools, recommendations, and helps for your own journey.",
};

export default function ResourcesPage() {
  return (
    <ComingSoon
      eyebrow="Resources"
      title="Helps for your own journey"
      blurb="The tools, products, and recommendations we lean on will be gathered here. Scope is still being finalized."
    />
  );
}
*/
