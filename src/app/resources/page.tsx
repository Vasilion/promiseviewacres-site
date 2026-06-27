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
