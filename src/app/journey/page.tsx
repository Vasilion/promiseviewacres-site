import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "The Journey — Promise View Acres",
  description: "Watch the homestead journey unfold.",
};

export default function JourneyPage() {
  return (
    <ComingSoon
      eyebrow="The Journey"
      title="Watch the journey unfold"
      blurb="This is where our videos and milestones will live. For now, the full journey is on our YouTube channel — come walk with us."
    />
  );
}
