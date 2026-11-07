import { Suspense } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { site, telLink, whatsappHref } from "@/config/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { QuoteForm } from "@/components/forms/quote-form";

export const metadata = buildMetadata({
  title: "Get a Shipping Quote — Bangladesh ⇄ Canada",
  description:
    "Request a shipping quote for parcels, documents, air cargo or sea freight between Bangladesh and Canada. Five quick steps, no obligation.",
  path: "/get-a-quote",
});

export default function GetAQuote() {
  const tel = telLink();
  const wa = whatsappHref("Hi — I'd like a shipping quote.");

  return (
    <section className="bg-paper-warm/50 pt-24 md:pt-32">
      <div className="container-site pb-20 lg:pb-28">
        <Breadcrumbs items={[{ label: "Get a Quote" }]} />
        <div className="mt-10 grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          {/* Sidebar */}
          <aside>
            <p className="kicker text-accent">Request a quote</p>
            <h1 className="font-display mt-4 text-balance text-4xl font-medium leading-[1.05] text-navy-900 sm:text-5xl">
              Tell us what you&apos;re sending.
            </h1>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-slate-ink">
              Five short steps. Real route, real shipment details — that&apos;s
              what it takes to give you a real price instead of a guess.
            </p>

            <div className="mt-10 space-y-px border border-line bg-line">
              {[
                "You send the shipment details",
                "We check route, service and options",
                "You get a quote on your preferred channel",
              ].map((s, i) => (
                <div key={s} className="flex items-center gap-4 bg-white p-4">
                  <span className="font-mono text-xs tracking-widest text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-navy-900">{s}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border border-line bg-white p-6">
              <p className="kicker text-slate-ink">Prefer to talk?</p>
              <div className="mt-4 space-y-2.5">
                {tel && (
                  <a href={tel} className="flex items-center gap-3 text-sm font-semibold text-navy-900 hover:text-accent">
                    <Phone className="size-4 text-accent" aria-hidden /> {site.phone}
                  </a>
                )}
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-semibold text-navy-900 hover:text-accent">
                    <MessageCircle className="size-4 text-accent" aria-hidden /> WhatsApp us
                  </a>
                )}
                {!tel && !wa && (
                  <p className="text-xs text-slate-ink/70">
                    Add contact details in site config to show them here.
                  </p>
                )}
              </div>
            </div>
          </aside>

          {/* Form — Suspense needed for useSearchParams prefill */}
          <Suspense fallback={<div className="h-96 animate-pulse border border-line bg-white" />}>
            <QuoteForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
