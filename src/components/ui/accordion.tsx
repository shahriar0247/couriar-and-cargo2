"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";

export type AccordionItem = { question: string; answer: string };

export function Accordion({ items, light = false }: { items: AccordionItem[]; light?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className={`divide-y ${light ? "divide-white/12" : "divide-line"}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className={light ? "border-white/10" : "border-line"}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={`flex w-full items-center justify-between gap-6 py-5 text-left transition-colors ${
                light ? "text-paper hover:text-accent" : "text-navy-900 hover:text-accent"
              }`}
            >
              <span className="text-[0.9375rem] font-medium sm:text-base">{item.question}</span>
              <Plus
                className={`size-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45 text-accent" : "opacity-50"}`}
                aria-hidden
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className={`pb-6 max-w-2xl text-sm leading-relaxed sm:text-[0.9375rem] ${light ? "text-paper/65" : "text-slate-ink"}`}>
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
