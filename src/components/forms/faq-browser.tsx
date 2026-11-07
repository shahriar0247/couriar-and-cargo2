"use client";

import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import { FAQ_CATEGORIES, type FaqItem } from "@/lib/data/faqs";
import { Accordion } from "@/components/ui/accordion";

/** Searchable, category-filtered FAQ browser. */
export function FaqBrowser({ faqs }: { faqs: FaqItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter(
      (f) =>
        (category === "All" || f.category === category) &&
        (!q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)),
    );
  }, [faqs, query, category]);

  const grouped = useMemo(() => {
    const order = category === "All" ? FAQ_CATEGORIES : [category];
    return order
      .map((c) => ({ category: c, items: filtered.filter((f) => f.category === c) }))
      .filter((g) => g.items.length > 0);
  }, [filtered, category]);

  return (
    <div>
      {/* search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-ink" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions — e.g. customs, weight, urgent"
          aria-label="Search frequently asked questions"
          className="w-full border border-line bg-white py-4 pl-11 pr-4 text-sm text-navy-900 placeholder:text-slate-ink/50 focus:border-navy-900"
        />
      </div>

      {/* category chips */}
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {["All", ...FAQ_CATEGORIES].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={`border px-4 py-2 font-mono text-[0.625rem] uppercase tracking-[0.15em] transition-colors ${
              category === c
                ? "border-navy-900 bg-navy-900 text-paper"
                : "border-line bg-white text-slate-ink hover:border-navy-900 hover:text-navy-900"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* results */}
      <div className="mt-10 space-y-12">
        {grouped.length === 0 ? (
          <div className="border border-line bg-white p-10 text-center">
            <SearchX className="mx-auto size-8 text-slate-ink/40" aria-hidden />
            <p className="mt-4 text-sm text-slate-ink">
              Nothing matches &ldquo;{query}&rdquo;. Try different words — or ask us
              directly on WhatsApp.
            </p>
          </div>
        ) : (
          grouped.map((g) => (
            <section key={g.category} aria-labelledby={`faq-${g.category}`}>
              <h2 id={`faq-${g.category}`} className="kicker text-accent">
                {g.category}
                <span className="ml-3 text-slate-ink/50">{g.items.length}</span>
              </h2>
              <div className="mt-4 border-y border-line">
                <Accordion items={g.items} />
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
