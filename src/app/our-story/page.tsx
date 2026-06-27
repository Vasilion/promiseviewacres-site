import type { Metadata } from "next";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { ourStory } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Story — Promise View Acres",
  description:
    "Two imperfect people deciding to trust God with their land, their family, and their life.",
};

export default function OurStoryPage() {
  return (
    <>
      {/* Intro */}
      <section className="bg-earth text-cream">
        <div className="container-pv py-24 sm:py-28 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage mb-4">
            Our Story
          </p>
          <h1 className="text-cream text-3xl sm:text-5xl max-w-3xl mx-auto leading-tight">
            {ourStory.intro}
          </h1>
        </div>
      </section>

      {/* Invitation */}
      <section className="py-20">
        <div className="container-pv max-w-3xl">
          <Reveal>
            <p className="text-lg sm:text-xl leading-relaxed text-earth/85">
              {ourStory.invitation}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-earth/85">
              {ourStory.resonate}
            </p>
            <div className="mt-8">
              <Button href={ourStory.joinCta.href} external>
                {ourStory.joinCta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Picture of the Promise */}
      <section className="py-8">
        <div className="container-pv">
          <Reveal>
            <figure className="relative rounded-3xl overflow-hidden border border-earth/10">
              {/* Replace with real "Picture of the Promise" image */}
              <div
                className="aspect-[21/9] w-full"
                style={{
                  background:
                    "linear-gradient(135deg, #6a5643 0%, #246b03 60%, #72b030 100%)",
                }}
                aria-hidden
              />
              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-earth/80 to-transparent p-6">
                <p className="text-cream font-display text-2xl">
                  {ourStory.pictureOfThePromise.title}
                </p>
                <p className="text-cream/80 text-sm mt-1">
                  {ourStory.pictureOfThePromise.caption}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Long-form testimony */}
      <section className="py-20">
        <div className="container-pv max-w-2xl">
          <div className="space-y-6">
            {ourStory.journey.map((para, i) => (
              <Reveal key={i} delay={Math.min(i, 4) * 0.04}>
                <p
                  className={
                    para === "Welcome to Promise View Acres." ||
                    para === "In that moment I surrendered, and my life changed forever."
                      ? "font-display text-2xl text-earth leading-snug"
                      : "text-lg leading-relaxed text-earth/85"
                  }
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
