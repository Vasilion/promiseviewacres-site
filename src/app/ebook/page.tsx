import type { Metadata } from "next";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { ebook } from "@/content/ebook";

export const metadata: Metadata = {
  title: ebook.title,
  description:
    "A faith-rooted homestead ebook from Promise View Acres — practical wisdom for stewarding your land.",
  alternates: { canonical: "/ebook" },
  openGraph: {
    title: `${ebook.title} — Promise View Acres`,
    description:
      "A faith-rooted homestead ebook from Promise View Acres — practical wisdom for stewarding your land.",
    url: "/ebook",
  },
};

export default function EbookPage() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-pv max-w-3xl">
        <Reveal className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
            The Ebook
          </p>
          <h1 className="text-4xl text-earth sm:text-5xl">{ebook.title}</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-earth/75">
            {ebook.tagline}
          </p>
        </Reveal>

        <Reveal className="mt-12 rounded-3xl border border-earth/10 bg-linen/60 p-6 sm:p-10">
          <div className="space-y-4">
            {ebook.description.map((para, i) => (
              <p key={i} className="leading-relaxed text-earth/80">
                {para}
              </p>
            ))}
          </div>

          {ebook.includes.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">
                What&apos;s inside
              </p>
              <ul className="mt-4 space-y-2">
                {ebook.includes.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-earth/80"
                  >
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-evergreen" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 flex flex-col items-center gap-4 border-t border-earth/10 pt-8 text-center">
            <p className="text-4xl font-semibold text-earth">{ebook.price}</p>
            <Button href={ebook.paymentLinkUrl} external>
              Buy the Ebook
            </Button>
            <p className="max-w-sm text-sm text-earth/60">
              Secure checkout through Stripe. Your PDF is emailed to you right
              after purchase.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
