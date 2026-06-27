import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "earth";

const styles: Record<Variant, string> = {
  primary:
    "bg-evergreen text-cream hover:bg-evergreen-deep border border-transparent",
  earth:
    "bg-earth/85 text-cream hover:bg-earth border border-transparent backdrop-blur-sm",
  outline:
    "bg-transparent text-cream hover:bg-cream/10 border border-cream/60",
};

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const cls = `inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-colors duration-200 ${styles[variant]} ${className}`;
  const isExternal = external || href.startsWith("http");
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
