/** Lightweight line icons, sage-toned by default via currentColor. */
import type { SVGProps } from "react";

const base = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function LeafIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 12-4 16-9 16Z" />
      <path d="M4 20c3-6 7-9 12-11" />
    </svg>
  );
}

export function SproutIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21v-9" />
      <path d="M12 12C9 12 7 10 7 6c4 0 5 2 5 6Z" />
      <path d="M12 14c0-4 1-6 5-6 0 4-2 6-5 6Z" />
    </svg>
  );
}

export function HandsIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M3 12c2-1 4-1 6 1l2 2" />
      <path d="M21 12c-2-1-4-1-6 1l-2 2" />
      <path d="M12 21v-7" />
      <path d="M9 7l3-3 3 3" />
    </svg>
  );
}

export function HomeIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </svg>
  );
}

export function HeartIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
    </svg>
  );
}

export function PeaceIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v16M12 12l5 5M12 12l-5 5" />
    </svg>
  );
}

export function YoutubeIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="M11 9.5v5l4-2.5-4-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TreeMark(p: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M12 22v-6" />
      <path d="M12 16c-4 0-6-2.5-6-5.5C6 7 8.5 4 12 4s6 3 6 6.5c0 3-2 5.5-6 5.5Z" />
      <path d="M12 11c-1.5-1.5-3-2-4.5-2M12 11c1.5-1.5 3-2 4.5-2" />
    </svg>
  );
}
