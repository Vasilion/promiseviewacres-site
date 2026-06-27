import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  children,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl text-earth">{title}</h2>
      {children && (
        <div className="mt-4 text-earth/75 leading-relaxed">{children}</div>
      )}
    </div>
  );
}
