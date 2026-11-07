"use client";

import { motion, useReducedMotion } from "motion/react";
import { RevealItem, RevealGroup } from "@/components/motion/reveal";

export type TimelineStep = { n: string; title: string; body: string; note: string };

/** Vertical editorial timeline with a drawing connector line. */
export function ProcessTimeline({ steps }: { steps: TimelineStep[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto max-w-3xl">
      {/* spine */}
      <motion.div
        className="absolute left-[1.375rem] top-0 h-full w-px origin-top bg-line sm:left-1/2"
        initial={reduce ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-5% 0px" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
      />
      <RevealGroup className="space-y-10 sm:space-y-14">
        {steps.map((s, i) => {
          const left = i % 2 === 0;
          return (
            <RevealItem key={s.n}>
              <div className={`relative flex gap-6 sm:w-1/2 ${left ? "sm:pr-12" : "sm:ml-auto sm:pl-12"} pl-16 sm:pl-0 ${left ? "" : "sm:pl-12"}`}>
                {/* node */}
                <span
                  className={`absolute top-1 grid size-11 place-items-center rounded-full border border-line bg-white font-mono text-[0.625rem] tracking-wider text-accent left-0 ${
                    left ? "sm:left-auto sm:-right-[1.375rem]" : "sm:-left-[1.375rem]"
                  }`}
                  aria-hidden
                >
                  {s.n}
                </span>
                <div className={`border border-line bg-white p-6 ${left ? "sm:text-right" : ""}`}>
                  <h3 className="font-display text-xl font-medium text-navy-900">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-ink">{s.body}</p>
                  <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">
                    {s.note}
                  </p>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}
