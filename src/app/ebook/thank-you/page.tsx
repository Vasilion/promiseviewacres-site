import type { Metadata } from "next";
import Button from "@/components/Button";
import { ebook } from "@/content/ebook";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your Promise View Acres ebook is on its way.",
  alternates: { canonical: "/ebook/thank-you" },
  // Order-confirmation page — keep it out of search results.
  robots: { index: false, follow: false },
};

export default function EbookThankYouPage() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-pv max-w-xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
          Payment received
        </p>
        <h1 className="text-4xl text-earth sm:text-5xl">Thank you</h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-earth/75">
          Your copy of <strong>{ebook.title}</strong> is on its way to your
          inbox as a PDF attachment. It usually arrives within a minute or two.
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-earth/60">
          Don&apos;t see it? Check your spam or promotions folder. Still nothing
          after a few minutes? Reach out and we&apos;ll get it to you.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" variant="primary">
            Back Home
          </Button>
          <Button href="/contact" variant="earth">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
