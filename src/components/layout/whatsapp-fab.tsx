import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/config/site";

/** Floating WhatsApp button — rendered only when a number is configured. */
export function WhatsappFab() {
  const href = whatsappHref("Hi — I'd like to ask about shipping between Bangladesh and Canada.");
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-8px_rgb(37_211_102/0.6)] transition-transform duration-300 hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <MessageCircle className="size-6" aria-hidden />
      <span className="sr-only">Chat on WhatsApp</span>
      <span
        aria-hidden
        className="pointer-events-none absolute right-full mr-3 whitespace-nowrap bg-navy-950 px-3 py-1.5 font-mono text-[0.625rem] tracking-widest text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        FASTEST REPLY
      </span>
    </a>
  );
}
