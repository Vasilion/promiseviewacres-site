import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { SproutIcon, LeafIcon, HandsIcon } from "@/components/Icons";
import { beyondOrganic } from "@/content/site";

export const metadata: Metadata = {
  title: "Beyond Organic Gardening — Promise View Acres",
  description:
    "A regenerative growing philosophy rooted in knowing the heart of the original Gardener.",
};

const principleIcons = [SproutIcon, LeafIcon, HandsIcon];

export default function BeyondOrganicPage() {
  const { hero, whatIsIt, principles, consultation } = beyondOrganic;

  return (
    <>
      {/* Photo hero banner */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-[42vh] sm:min-h-[48vh]">
        <Image
          src="/images/beyond-organic-banner.jpg"
          alt="Fresh-picked strawberries from the homestead garden"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
        {/* Scrim for text legibility over the bright photo */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(34,33,28,0.35) 0%, rgba(34,33,28,0.30) 40%, rgba(34,33,28,0.60) 100%)",
          }}
          aria-hidden
        />
        <div className="container-pv py-20 sm:py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/80 mb-4">
            Beyond Organic
          </p>
          <h1 className="text-cream text-4xl sm:text-5xl max-w-3xl mx-auto">
            {hero.title}
          </h1>
          <p className="mt-4 text-lg text-cream/90 max-w-xl mx-auto">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* What is it */}
      <section className="pt-16 sm:pt-20 pb-20">
        <div className="container-pv max-w-3xl">
          <Reveal>
            <h2 className="text-3xl text-earth mb-6">{whatIsIt.heading}</h2>
          </Reveal>
          <div className="space-y-5">
            {whatIsIt.body.map((p, i) => (
              <Reveal key={i}>
                <p className="text-lg leading-relaxed text-earth/85">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* Scripture */}
          <Reveal>
            <blockquote className="my-10 border-l-4 border-sage pl-6 py-2">
              <p className="font-display text-2xl text-earth leading-snug italic">
                “{whatIsIt.scripture.text}”
              </p>
              <cite className="mt-3 block not-italic text-sm font-semibold uppercase tracking-wider text-sage">
                {whatIsIt.scripture.ref}
              </cite>
            </blockquote>
          </Reveal>

          <div className="space-y-5">
            {whatIsIt.bodyAfter.map((p, i) => (
              <Reveal key={i}>
                <p className="text-lg leading-relaxed text-earth/85">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 bg-linen/60 border-y border-earth/10">
        <div className="container-pv">
          <Reveal>
            <SectionHeading
              eyebrow="Our Approach"
              title="The foundation we grow on"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {principles.map((p, i) => {
              const Icon = principleIcons[i] ?? LeafIcon;
              return (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl bg-cream border border-earth/10 p-7">
                    <div className="text-sage mb-4">
                      <Icon width={32} height={32} />
                    </div>
                    <h3 className="text-xl text-earth mb-2">{p.title}</h3>
                    <p className="text-sm leading-relaxed text-earth/75">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation booking — PLACEHOLDER.
          TODO (vault build-plan.md): wire real booking provider once Luke
          decides (Cal.com/Calendly embed vs Stripe Checkout + intake form).
          Intake form questions pending from Luke. */}
      <section id="book" className="py-20 sm:py-28">
        <div className="container-pv max-w-3xl">
          <Reveal>
            <div className="rounded-3xl bg-earth text-cream p-8 sm:p-12">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-cream text-3xl">{consultation.heading}</h2>
                <p className="text-sage font-semibold">
                  <span className="text-2xl">{consultation.price}</span>
                  <span className="text-cream/70 text-sm">
                    {" "}
                    / {consultation.duration}
                  </span>
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {consultation.body.map((p, i) => (
                  <p key={i} className="text-cream/85 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Placeholder CTA — replaced by real scheduler/checkout */}
              <div className="mt-8 rounded-2xl border border-dashed border-cream/30 bg-cream/5 p-6 text-center">
                <p className="text-cream/70 text-sm">
                  Booking opens soon. The scheduling + intake form will live
                  here.
                </p>
                <button
                  type="button"
                  disabled
                  className="mt-4 inline-flex items-center rounded-full bg-sage/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cream/70 cursor-not-allowed"
                >
                  Book a Consultation
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
