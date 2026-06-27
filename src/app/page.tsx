import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { home } from "@/content/site";
import {
  HandsIcon,
  LeafIcon,
  PeaceIcon,
  HomeIcon,
  HeartIcon,
} from "@/components/Icons";

const valueIcons = [HandsIcon, LeafIcon, PeaceIcon, HomeIcon, HeartIcon];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Mission */}
      <section className="py-20 sm:py-28">
        <div className="container-pv">
          <Reveal>
            <SectionHeading eyebrow={home.mission.eyebrow} title="Why we are doing this" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 mx-auto max-w-3xl text-center text-lg sm:text-xl leading-relaxed text-earth/85">
              {home.mission.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-linen/60 border-y border-earth/10">
        <div className="container-pv">
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {home.values.map((v, i) => {
              const Icon = valueIcons[i] ?? LeafIcon;
              return (
                <Reveal as="li" key={v.title} delay={i * 0.06}>
                  <div className="text-sage mb-4">
                    <Icon />
                  </div>
                  <h3 className="text-xl mb-2 text-earth">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-earth/75">
                    {v.body}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Current Stewardship */}
      <section className="py-20 sm:py-28">
        <div className="container-pv">
          <Reveal>
            <SectionHeading
              eyebrow={home.stewardship.eyebrow}
              title="What we're working on right now"
              align="left"
            >
              <p>{home.stewardship.intro}</p>
            </SectionHeading>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {home.stewardship.cards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.06}>
                <article className="group h-full rounded-2xl bg-linen border border-earth/10 overflow-hidden">
                  {/* Image placeholder block (replace with real photos) */}
                  <div
                    className="h-36 w-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #72b030 0%, #246b03 100%)",
                    }}
                    aria-hidden
                  />
                  <div className="p-5">
                    <h3 className="text-lg text-earth mb-1.5">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-earth/70">
                      {card.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
