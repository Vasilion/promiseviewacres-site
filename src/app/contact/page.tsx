import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { YoutubeIcon, InstagramIcon, TikTokIcon } from "@/components/Icons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Promise View Acres — questions, encouragement, or to say hello.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Promise View Acres",
    description:
      "Get in touch with Promise View Acres — questions, encouragement, or to say hello.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-pv max-w-2xl">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
            Contact
          </p>
          <h1 className="text-4xl text-earth sm:text-5xl">Say hello</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-earth/75">
            Whether you have a question, a word of encouragement, or want to
            learn more — we&apos;d love to hear from you.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-earth/10 bg-linen/60 p-6 sm:p-9">
          <ContactForm />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-earth/60">Or reach us directly</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-1 inline-block font-medium text-evergreen hover:text-evergreen-deep"
          >
            {site.email}
          </a>
          <div className="mt-6 flex items-center justify-center gap-6 text-sage">
            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="transition-colors hover:text-evergreen"
            >
              <YoutubeIcon width={28} height={28} />
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-evergreen"
            >
              <InstagramIcon width={28} height={28} />
            </a>
            <a
              href={site.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="transition-colors hover:text-evergreen"
            >
              <TikTokIcon width={28} height={28} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
