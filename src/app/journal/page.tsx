import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Journal — Promise View Acres",
  description: "Notes, lessons, and reflections from the homestead.",
};

export default function JournalPage() {
  return (
    <ComingSoon
      eyebrow="Journal"
      title="Lessons from the land"
      blurb="Written reflections and what we're learning as we go will be published here. We're deciding the best shape for it — check back soon."
    />
  );
}
