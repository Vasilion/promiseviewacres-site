import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { ourStory } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Two imperfect people deciding to trust God with their land, their family, and their life.",
  alternates: { canonical: "/our-story" },
  openGraph: {
    title: "Our Story — Promise View Acres",
    description:
      "Two imperfect people deciding to trust God with their land, their family, and their life.",
    url: "/our-story",
  },
};

export default function OurStoryPage() {
  return (
    <>
      {/* Logo banner */}
      <section className="bg-cream border-b border-earth/10">
        <div className="container-pv py-6 sm:py-8 flex justify-center">
          <Image
            src="/images/pva-logo.jpg"
            alt="Promise View Acres"
            width={4585}
            height={4201}
            priority
            sizes="(max-width: 768px) 18rem, 24rem"
            className="w-64 sm:w-80 md:w-96 h-auto mix-blend-multiply"
          />
        </div>
      </section>

      {/* Intro heading + invitation */}
      <section className="pt-12 sm:pt-16 pb-20">
        <div className="container-pv max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage mb-4">
              Our Story
            </p>
            <h1 className="text-earth text-3xl sm:text-4xl lg:text-5xl leading-tight">
              {ourStory.intro}
            </h1>
          </div>
          <Reveal>
            <p className="mt-12 text-lg sm:text-xl leading-relaxed text-earth/85">
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

      {/* Picture of the Promise — story film */}
      <section className="py-8">
        <div className="container-pv">
          <Reveal>
            <figure>
              <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-earth/10 bg-earth">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube-nocookie.com/embed/ZQ9eCLp-9Lk"
                  title={ourStory.pictureOfThePromise.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <figcaption className="mt-4 text-center">
                <p className="font-display text-2xl text-earth">
                  {ourStory.pictureOfThePromise.title}
                </p>
                <p className="text-earth/70 text-sm mt-1">
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
