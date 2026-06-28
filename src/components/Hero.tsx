"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "./Button";
import { home } from "@/content/site";

const { hero } = home;

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-line", { y: 40, opacity: 0, duration: 1, stagger: 0.15 })
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-cta", { y: 16, opacity: 0, duration: 0.6, stagger: 0.12 }, "-=0.4");
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative min-h-[88vh] flex items-end overflow-hidden"
    >
      {/* Hero photo — family on the homestead window bench. */}
      <Image
        src="/images/hero.jpg"
        alt="The family at home on Promise View Acres, overlooking the water"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/* Darkening scrim so the cream headline stays legible over a bright photo. */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(34,33,28,0.10) 0%, rgba(34,33,28,0.15) 45%, rgba(34,33,28,0.78) 100%)",
        }}
        aria-hidden
      />

      <div className="container-pv pb-20 pt-32">
        <h1 className="max-w-3xl text-cream text-4xl sm:text-6xl font-display leading-[1.05]">
          <span className="hero-line block">Rooted in Faith.</span>
          <span className="hero-line block">Growing in Stewardship.</span>
        </h1>
        <p className="hero-sub mt-6 max-w-xl text-lg text-cream/85">
          {hero.subtext}
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <span className="hero-cta">
            <Button href={hero.primaryCta.href} variant="primary" external>
              {hero.primaryCta.label}
            </Button>
          </span>
          <span className="hero-cta">
            <Button href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </Button>
          </span>
        </div>
      </div>
    </section>
  );
}
