import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { InstagramIcon } from "@/components/Icons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Gallery — Promise View Acres",
  description: "Moments from the homestead, straight from our Instagram.",
};

export default function GalleryPage() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-pv">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage mb-3">
            Gallery
          </p>
          <h1 className="text-4xl sm:text-5xl text-earth">From the homestead</h1>
          <p className="mt-4 text-earth/75">
            Follow along on Instagram — new moments show up here as we share
            them.
          </p>
          <div className="mt-6">
            <Button href={site.instagram} external>
              <InstagramIcon width={18} height={18} /> Follow on Instagram
            </Button>
          </div>
        </div>

        {/* Instagram feed — PLACEHOLDER grid.
            TODO (vault build-plan.md): wire real source once Luke decides
            (third-party embed widget vs Instagram Graph API). */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05}>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-earth/10">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      i % 2 === 0
                        ? "linear-gradient(135deg, #72b030 0%, #246b03 100%)"
                        : "linear-gradient(135deg, #8a755e 0%, #6a5643 100%)",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 flex items-center justify-center text-cream/40">
                  <InstagramIcon width={28} height={28} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-earth/40">
          Instagram feed connects here once configured.
        </p>
      </div>
    </section>
  );
}
