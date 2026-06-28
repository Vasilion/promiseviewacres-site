import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import Button from "@/components/Button";
import { InstagramIcon } from "@/components/Icons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Gallery — Promise View Acres",
  description:
    "Photographs from the homestead — the land, the harvest, and life on Promise View Acres.",
};

export default function GalleryPage() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-pv">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
            Gallery
          </p>
          <h1 className="text-4xl text-earth sm:text-5xl">From the homestead</h1>
          <p className="mt-4 text-earth/75">
            Moments from the land, the harvest, and the everyday work of
            building a life rooted in faith.
          </p>
          <div className="mt-6">
            <Button href={site.instagram} external>
              <InstagramIcon width={18} height={18} /> Follow on Instagram
            </Button>
          </div>
        </div>

        <GalleryGrid />
      </div>
    </section>
  );
}
