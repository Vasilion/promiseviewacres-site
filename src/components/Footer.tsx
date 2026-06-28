import Link from "next/link";
import { site } from "@/content/site";
import { TreeMark, YoutubeIcon, InstagramIcon, TikTokIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-earth text-cream/85 mt-24">
      <div className="container-pv py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 text-cream">
            <TreeMark />
            <span className="font-display text-lg tracking-wide">
              PROMISE VIEW ACRES
            </span>
          </div>
          <p className="mt-3 text-sm text-cream/70 max-w-xs">
            Rooted in Faith. Growing in Stewardship. Documenting a homestead
            built on faith, for His glory.
          </p>
        </div>

        <div>
          <h4 className="text-cream text-sm font-semibold uppercase tracking-wider mb-4">
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream/70 hover:text-cream transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-cream text-sm font-semibold uppercase tracking-wider mb-4">
            Follow Along
          </h4>
          <div className="flex items-center gap-4 text-sage">
            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-cream transition-colors"
            >
              <YoutubeIcon />
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-cream transition-colors"
            >
              <InstagramIcon />
            </a>
            <a
              href={site.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-cream transition-colors"
            >
              <TikTokIcon />
            </a>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block text-sm text-cream/70 hover:text-cream transition-colors"
          >
            {site.email}
          </a>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="container-pv py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream/55">
          <p>
            © {new Date().getFullYear()} Promise View Acres. All for His glory.
          </p>
          <p>
            Built by{" "}
            <a
              href="https://unyxwebsolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage hover:text-cream transition-colors"
            >
              Unyx Web Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
