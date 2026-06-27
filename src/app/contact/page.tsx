import type { Metadata } from "next";
import Button from "@/components/Button";
import { YoutubeIcon, InstagramIcon } from "@/components/Icons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact — Promise View Acres",
  description: "Get in touch with Promise View Acres.",
};

export default function ContactPage() {
  return (
    <section className="py-24 sm:py-28">
      <div className="container-pv max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage mb-3">
          Contact
        </p>
        <h1 className="text-4xl sm:text-5xl text-earth">Say hello</h1>
        <p className="mt-5 text-lg leading-relaxed text-earth/75">
          Whether you have a question, a word of encouragement, or want to
          learn more — we’d love to hear from you.
        </p>

        <div className="mt-8">
          <Button href={`mailto:${site.email}`}>Email Us</Button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-sage">
          <a
            href={site.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-evergreen transition-colors"
          >
            <YoutubeIcon width={30} height={30} />
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-evergreen transition-colors"
          >
            <InstagramIcon width={30} height={30} />
          </a>
        </div>

        {/* TODO (vault build-plan.md, Phase 5): replace mailto with an SES-backed
            contact form once recipient inbox is confirmed. */}
      </div>
    </section>
  );
}
