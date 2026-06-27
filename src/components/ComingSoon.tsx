import Button from "./Button";

/** Reusable stub for pages whose scope isn't finalized yet. */
export default function ComingSoon({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <section className="py-28 sm:py-36">
      <div className="container-pv max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage mb-4">
          {eyebrow}
        </p>
        <h1 className="text-4xl sm:text-5xl text-earth">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-earth/75">{blurb}</p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/our-story">Read Our Story</Button>
        </div>
      </div>
    </section>
  );
}
