import { ArrowRight } from "lucide-react";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { whatsappHref } from "@/config/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FaqBrowser } from "@/components/forms/faq-browser";
import { ButtonLink } from "@/components/ui/button";
import { faqs } from "@/lib/data/faqs";

export const metadata = buildMetadata({
  title: "FAQ — Shipping Between Bangladesh and Canada",
  description:
    "Answers to common questions about shipping parcels, documents, air cargo and sea freight between Bangladesh and Canada — pricing, customs, packaging and urgent shipping.",
  path: "/faq",
});

export default function FaqPage() {
  const wa = whatsappHref("Hi — I have a question about shipping.");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />

      <section className="bg-paper-warm/50 pt-24 md:pt-32">
        <div className="container-site pb-14">
          <Breadcrumbs items={[{ label: "FAQ" }]} />
          <div className="mt-10 max-w-2xl">
            <p className="kicker text-accent">Help center</p>
            <h1 className="font-display mt-4 text-balance text-4xl font-medium leading-[1.04] text-navy-900 sm:text-5xl">
              Asked, answered.
            </h1>
            <p className="mt-5 text-pretty leading-relaxed text-slate-ink sm:text-lg">
              The questions people actually ask about shipping between Bangladesh
              and Canada. Don&apos;t see yours? Ask us directly.
            </p>
          </div>
        </div>
      </section>

      <section className="container-site pb-20 lg:pb-28">
        <FaqBrowser faqs={faqs} />
      </section>

      <section className="bg-navy-950">
        <div className="container-site flex flex-wrap items-center justify-between gap-6 py-14">
          <div>
            <h2 className="font-display text-2xl font-medium text-paper sm:text-3xl">
              Still wondering something?
            </h2>
            <p className="mt-2 text-paper/60">Ask a person — WhatsApp is usually fastest.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {wa && <ButtonLink href={wa} variant="accent" external>Ask on WhatsApp</ButtonLink>}
            <ButtonLink href="/get-a-quote" variant="ghost-light">
              Get a Quote <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
