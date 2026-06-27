"use client";

import { useRef } from "react";
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
      {/* Background image placeholder — replace with hero photo.
          Using a layered gradient evoking a sunset homestead until the
          real image is provided (see vault: hero photo TODO). */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #6a5643 0%, #8a755e 35%, #246b03 120%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 10%, #f2eadc 0%, transparent 55%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-black/20" aria-hidden />

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
