"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeftRight } from "lucide-react";

const BD_CITIES = ["Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi", "Other (Bangladesh)"];
const CA_CITIES = ["Toronto", "Vancouver", "Montréal", "Calgary", "Ottawa", "Other (Canada)"];

/**
 * Hero quick-quote: direction toggle + two city fields.
 * Hands off to the full quote wizard via query params — no duplicate form.
 */
export function QuickQuote() {
  const router = useRouter();
  const [direction, setDirection] = useState<"bd-to-ca" | "ca-to-bd">("bd-to-ca");
  const [origin, setOrigin] = useState("Dhaka");
  const [dest, setDest] = useState("Toronto");

  const originCities = direction === "bd-to-ca" ? BD_CITIES : CA_CITIES;
  const destCities = direction === "bd-to-ca" ? CA_CITIES : BD_CITIES;

  const flip = () => {
    setDirection((d) => (d === "bd-to-ca" ? "ca-to-bd" : "bd-to-ca"));
    setOrigin((o) => {
      const next = dest;
      setDest(o);
      return next;
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams({ direction, origin: origin, dest });
    router.push(`/get-a-quote?${q.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className="border border-white/15 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-6"
      aria-label="Quick quote"
    >
      <p className="kicker text-paper/50">Start a quote</p>

      {/* Direction toggle */}
      <div className="mt-4 grid grid-cols-2 border border-white/15" role="radiogroup" aria-label="Shipping direction">
        {(
          [
            { value: "bd-to-ca", label: "BD → Canada", sub: "from Bangladesh" },
            { value: "ca-to-bd", label: "Canada → BD", sub: "to Bangladesh" },
          ] as const
        ).map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={direction === opt.value}
            onClick={() => {
              setDirection(opt.value);
              setOrigin(opt.value === "bd-to-ca" ? "Dhaka" : "Toronto");
              setDest(opt.value === "bd-to-ca" ? "Toronto" : "Dhaka");
            }}
            className={`px-3 py-3 text-left transition-colors duration-300 ${
              direction === opt.value ? "bg-accent text-navy-950" : "text-paper/70 hover:bg-white/5"
            }`}
          >
            <span className="block text-sm font-semibold">{opt.label}</span>
            <span className={`block text-[0.6875rem] ${direction === opt.value ? "text-navy-950/70" : "text-paper/45"}`}>
              {opt.sub}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-stretch gap-2">
        <label className="flex-1">
          <span className="sr-only">Origin city</span>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full border border-white/15 bg-transparent px-3 py-3 text-sm text-paper focus:border-accent [&>option]:text-navy-900"
          >
            {originCities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={flip}
          aria-label="Swap origin and destination"
          className="grid w-11 shrink-0 place-items-center border border-white/15 text-paper/70 transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowLeftRight className="size-4" aria-hidden />
        </button>
        <label className="flex-1">
          <span className="sr-only">Destination city</span>
          <select
            value={dest}
            onChange={(e) => setDest(e.target.value)}
            className="w-full border border-white/15 bg-transparent px-3 py-3 text-sm text-paper focus:border-accent [&>option]:text-navy-900"
          >
            {destCities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="mt-4 flex w-full items-center justify-center gap-2 bg-paper px-5 py-3.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-accent hover:text-navy-950"
      >
        Continue to quote
        <ArrowRight className="size-4" aria-hidden />
      </button>
      <p className="mt-3 text-center text-[0.6875rem] text-paper/40">
        Free, no obligation — we reply on WhatsApp, phone or email.
      </p>
    </form>
  );
}
