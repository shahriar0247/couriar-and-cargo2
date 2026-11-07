import { site } from "@/config/site";

/** Wordmark + corridor glyph. Pure SVG, themeable via currentColor. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5" aria-hidden={false}>
      <svg width="34" height="26" viewBox="0 0 34 26" fill="none" role="img" aria-label="">
        <rect x="0.5" y="0.5" width="33" height="25" stroke={light ? "#F7F6F2" : "#101C2E"} />
        <path
          d="M5 18 C 11 8, 23 8, 29 6"
          stroke="#F97316"
          strokeWidth="1.75"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="5" cy="18" r="2.25" fill={light ? "#F7F6F2" : "#101C2E"} />
        <circle cx="29" cy="6" r="2.25" fill="#F97316" />
        <path d="M26 9.5 L29 6 L31.5 7.5" stroke="#F97316" strokeWidth="1.25" fill="none" />
      </svg>
      <span
        className={`font-display text-[1.05rem] leading-none font-semibold tracking-tight ${
          light ? "text-paper" : "text-navy-900"
        }`}
      >
        {site.name.split(" ")[0]}
        <span className={light ? "text-paper/60" : "text-slate-ink"}>
          {" "}
          {site.name.split(" ").slice(1).join(" ")}
        </span>
      </span>
    </span>
  );
}
