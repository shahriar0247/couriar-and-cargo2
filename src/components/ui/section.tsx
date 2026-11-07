import type { ReactNode } from "react";

/** Numbered editorial section heading. */
export function SectionHeading({
  index,
  kicker,
  title,
  intro,
  light = false,
  className = "",
}: {
  index?: string;
  kicker?: string;
  title: ReactNode;
  intro?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {(index || kicker) && (
        <p className={`kicker flex items-center gap-3 ${light ? "text-paper/50" : "text-slate-ink"}`}>
          {index && <span className="text-accent">{index}</span>}
          {kicker}
        </p>
      )}
      <h2
        className={`font-display mt-4 text-balance text-3xl font-medium leading-[1.08] sm:text-4xl lg:text-[2.75rem] ${
          light ? "text-paper" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-pretty text-base leading-relaxed sm:text-lg ${
            light ? "text-paper/65" : "text-slate-ink"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
