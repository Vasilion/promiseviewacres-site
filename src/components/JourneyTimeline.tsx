"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { JourneyVideo, JourneyYear } from "@/lib/youtube";

type Props = {
  years: JourneyYear[];
  shorts: JourneyVideo[];
  videoCount: number;
};

type Tab = "videos" | "shorts";

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function PlayBadge() {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/90 text-evergreen shadow-lg transition-transform duration-300 group-hover:scale-110">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </span>
  );
}

export default function JourneyTimeline({ years, shorts, videoCount }: Props) {
  const [tab, setTab] = useState<Tab>("videos");
  const [active, setActive] = useState<{ video: JourneyVideo; kind: Tab } | null>(
    null
  );

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close]);

  const jumpToYear = (year: string) => {
    document
      .getElementById(`journey-year-${year}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mt-10">
      {/* Tab toggle */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-earth/15 bg-linen p-1">
          <button
            type="button"
            onClick={() => setTab("videos")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              tab === "videos"
                ? "bg-evergreen text-cream"
                : "text-earth/70 hover:text-earth"
            }`}
          >
            Videos
            <span className="ml-1.5 opacity-70">{videoCount}</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("shorts")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              tab === "shorts"
                ? "bg-evergreen text-cream"
                : "text-earth/70 hover:text-earth"
            }`}
          >
            Shorts
            <span className="ml-1.5 opacity-70">{shorts.length}</span>
          </button>
        </div>
      </div>

      {tab === "videos" ? (
        <>
          {/* Year jump rail */}
          {years.length > 1 && (
            <div className="sticky top-20 z-30 -mx-6 mt-8 mb-4 bg-cream/85 px-6 py-3 backdrop-blur">
              <div className="flex flex-wrap justify-center gap-2">
                {years.map((y) => (
                  <button
                    key={y.year}
                    type="button"
                    onClick={() => jumpToYear(y.year)}
                    className="rounded-full border border-earth/15 px-4 py-1.5 text-sm font-medium text-earth/80 transition-colors hover:border-evergreen hover:text-evergreen"
                  >
                    {y.year}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="relative mt-6">
            {/* vertical spine */}
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px bg-earth/15 md:left-1/2 md:-translate-x-1/2"
              aria-hidden
            />
            <div className="space-y-16">
              {years.map((y) => (
                <section
                  key={y.year}
                  id={`journey-year-${y.year}`}
                  className="relative scroll-mt-36"
                >
                  {/* Year marker */}
                  <div className="relative mb-8 flex items-center gap-4 pl-8 md:justify-center md:pl-0">
                    <span
                      className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-cream bg-evergreen md:left-1/2 md:-translate-x-1/2"
                      aria-hidden
                    />
                    <h2 className="font-display text-3xl text-earth md:rounded-full md:bg-linen md:px-6 md:py-1">
                      {y.year}
                    </h2>
                  </div>

                  {/* Video cards */}
                  <div className="grid gap-x-8 gap-y-8 pl-8 sm:grid-cols-2 md:grid-cols-2 md:pl-0">
                    {y.videos.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setActive({ video: v, kind: "videos" })}
                        className="group text-left focus:outline-none"
                      >
                        <div className="relative aspect-video overflow-hidden rounded-2xl border border-earth/10 bg-linen">
                          <Image
                            src={v.thumbnail}
                            alt={v.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                          <span className="absolute inset-0 bg-earth/0 transition-colors group-hover:bg-earth/15" />
                          <PlayBadge />
                        </div>
                        <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug text-earth group-hover:text-evergreen">
                          {v.title}
                        </h3>
                        <p className="mt-1 text-xs text-earth/60">
                          {formatDate(v.publishedAt)}
                          {v.views ? ` · ${v.views}` : ""}
                        </p>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Shorts grid */
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shorts.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive({ video: s, kind: "shorts" })}
              className="group text-left focus:outline-none"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-earth/10 bg-linen">
                <Image
                  src={s.thumbnail}
                  alt={s.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-earth/0 transition-colors group-hover:bg-earth/15" />
                <PlayBadge />
                {s.views && (
                  <span className="absolute bottom-2 left-2 rounded-full bg-ink/70 px-2 py-0.5 text-[11px] font-medium text-cream">
                    {s.views}
                  </span>
                )}
              </div>
              <h3 className="mt-2 line-clamp-2 text-sm font-medium leading-snug text-earth group-hover:text-evergreen">
                {s.title}
              </h3>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox player */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex h-dvh w-screen items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={active.video.title}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-cream/25"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div
            className={
              active.kind === "shorts"
                ? "relative h-[80dvh] max-w-[92vw] aspect-[9/16] overflow-hidden rounded-2xl bg-black shadow-2xl"
                : "relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            }
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${active.video.id}?autoplay=1`}
              title={active.video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
