"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";
import { TreeMark } from "./Icons";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-earth/10">
      <nav className="container-pv flex items-center justify-between h-20">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-evergreen">
            <TreeMark />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg tracking-wide text-earth">
              PROMISE VIEW ACRES
            </span>
            <span className="block text-[10px] tracking-[0.2em] uppercase text-sage font-semibold">
              {site.tagline}
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-evergreen ${
                  isActive(item.href)
                    ? "text-evergreen"
                    : "text-earth/80"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href={site.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-evergreen px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream hover:bg-evergreen-deep transition-colors"
          >
            Follow the Journey
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex flex-col gap-1.5 p-2 text-earth"
        >
          <span
            className={`block h-0.5 w-6 bg-current transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-earth/10 bg-cream">
          <ul className="container-pv flex flex-col py-4">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-base font-medium ${
                    isActive(item.href) ? "text-evergreen" : "text-earth/80"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <a
                href={site.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-evergreen px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream"
              >
                Follow the Journey
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
