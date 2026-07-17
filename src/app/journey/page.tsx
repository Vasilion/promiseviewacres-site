import type { Metadata } from "next";
import { getJourneyContent, groupByYear } from "@/lib/youtube";
import JourneyTimeline from "@/components/JourneyTimeline";

export const metadata: Metadata = {
  title: "The Journey",
  description:
    "Every step of the homestead journey — our YouTube videos, year by year.",
  alternates: { canonical: "/journey" },
  openGraph: {
    title: "The Journey — Promise View Acres",
    description:
      "Every step of the homestead journey — our YouTube videos, year by year.",
    url: "/journey",
  },
};

// Re-pull from YouTube daily so new uploads appear automatically.
export const revalidate = 86400;

export default async function JourneyPage() {
  const { videos, shorts } = await getJourneyContent();
  const years = groupByYear(videos);

  return (
    <section className="py-14 sm:py-20">
      <div className="container-pv">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
            The Journey
          </p>
          <h1 className="text-4xl text-earth sm:text-5xl">
            Watch the journey unfold
          </h1>
          <p className="mt-4 text-earth/75">
            Every video we&apos;ve shared, walked back through the years — from
            the first season on the land to today.
          </p>
        </div>

        <JourneyTimeline
          years={years}
          shorts={shorts}
          videoCount={videos.length}
        />
      </div>
    </section>
  );
}
