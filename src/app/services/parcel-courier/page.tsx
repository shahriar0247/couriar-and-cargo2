import {
  ArrowRight,
  FileText,
  Gift,
  Heart,
  Package,
  ShieldCheck,
  Timer,
  Undo2,
} from "lucide-react";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { whatsappHref } from "@/config/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ParcelIllustration } from "@/components/visual/illustrations";
import { SectionHeading } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { faqs } from "@/lib/data/faqs";

export const metadata = buildMetadata({
  title: "Parcel & Express Courier — Bangladesh ⇄ Canada",
  description:
    "Send parcels and documents between Bangladesh and Canada. Courier service for personal packages, papers, gifts and time-sensitive shipments in both directions.",
  path: "/services/parcel-courier",
});

const parcelFaqs = faqs.filter(
  (f) => f.category === "Parcels" || f.category === "Packaging",
);

export default function ParcelCourier() {
  const wa = whatsappHref("Hi — I want to send a parcel.");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(parcelFaqs)) }}
      />

      {/* Hero — warmer, human, off-paper background */}
      <section className="bg-paper-warm pt-24 md:pt-32">
        <div className="container-site">
          <Breadcrumbs items={[{ label: "Services" }, { label: "Parcel & Express" }]} />
          <div className="grid items-center gap-12 pb-16 pt-10 lg:grid-cols-2 lg:pb-24">
            <div>
              <p className="kicker text-accent">Service 03 — Courier</p>
              <h1 className="font-display mt-4 text-balance text-4xl font-medium leading-[1.04] text-navy-900 sm:text-5xl lg:text-6xl">
                Send parcels and documents.
              </h1>
              <p className="mt-6 max-w-lg text-pretty leading-relaxed text-slate-ink sm:text-lg">
                A document to Dhaka. A care package to Toronto. A gift that
                matters. Courier service for the shipments people actually send —
                handled by people, in both directions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/get-a-quote?service=parcel" variant="primary">
                  Send a Parcel
                </ButtonLink>
                {wa && <ButtonLink href={wa} variant="outline" external>WhatsApp us</ButtonLink>}
              </div>
            </div>
            <Reveal className="border border-line bg-white p-8 lg:p-10">
              <ParcelIllustration className="w-full" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* What people send — human grid */}
      <section className="container-site py-20 lg:py-28">
        <SectionHeading
          index="01"
          kicker="Everyday shipments"
          title="The things people actually send."
        />
        <RevealGroup className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: FileText, title: "Documents", body: "Certificates, contracts, academic papers, legal documents — the papers that can't wait or can't be lost." },
            { icon: Gift, title: "Personal parcels", body: "Gifts, clothing, sweets, the small things that carry meaning between families across two countries." },
            { icon: Package, title: "Smaller shipments", body: "Items too big for regular post but too small for freight — the in-between cargo courier was made for." },
            { icon: Timer, title: "Time-sensitive items", body: "Documents with deadlines, items needed soon — where courier speed makes the difference." },
          ].map((c) => (
            <RevealItem key={c.title} className="bg-paper p-7">
              <c.icon className="size-6 text-accent" aria-hidden />
              <h3 className="mt-5 text-base font-semibold text-navy-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-ink">{c.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Packaging guidance — practical card layout */}
      <section className="border-y border-line bg-white">
        <div className="container-site grid gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              index="02"
              kicker="Packing right"
              title="Pack it like it's crossing an ocean. It is."
              intro="Good packing is the cheapest insurance there is. These basics protect most shipments — and we'll give specific guidance for yours when you book."
            />
          </div>
          <ol className="space-y-px border border-line bg-line">
            {[
              ["Use a rigid box", "No worn-out cartons. Corrugated board, no holes, sized to the contents."],
              ["Cushion the inside", "Fill voids so nothing shifts. Fragile items get individual wrapping."],
              ["Seal every seam", "Strong packing tape on all edges — not string, not staples."],
              ["Label clearly", "Full sender and receiver names, addresses and phone numbers."],
              ["Remove old labels", "Previous barcodes and addresses cause misrouting — strip them off."],
              ["Keep documents flat", "Rigid envelopes or document mailers; never fold certificates."],
            ].map(([t, b], i) => (
              <li key={t} className="flex gap-5 bg-white p-6">
                <span className="font-mono text-xs tracking-widest text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-ink">{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Speed & availability */}
      <section className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <Reveal className="bg-navy-950 p-8 lg:p-12">
          <ShieldCheck className="size-8 text-accent" aria-hidden />
          <h2 className="font-display mt-6 text-3xl font-medium text-paper">
            Honest about speed.
          </h2>
          <p className="mt-4 leading-relaxed text-paper/65">
            Courier is the fastest way to move a small shipment — but real transit
            depends on the route, schedules and customs. We confirm a realistic
            window for your specific shipment instead of printing a promise.
          </p>
          <p className="mt-4 leading-relaxed text-paper/65">
            Need it urgently?{" "}
            <a href="/urgent-shipping" className="font-semibold text-paper underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
              Tell us the deadline.
            </a>
          </p>
        </Reveal>
        <div>
          <SectionHeading
            index="03"
            kicker="Both directions"
            title="Toronto to Dhaka. Dhaka to Toronto."
            intro="The same courier service runs in reverse — send to family in Bangladesh, or receive from Bangladesh in Canada. Just tell us which way it's going."
          />
          <ButtonLink href="/shipping-routes" variant="outline" className="mt-8">
            See the routes <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-line bg-paper-warm/60">
        <div className="container-site grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
          <div>
            <SectionHeading index="04" kicker="Parcel FAQs" title="Small boxes, common questions." />
            <div className="mt-8 flex items-start gap-4 border border-line bg-paper p-5">
              <Heart className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <p className="text-sm leading-relaxed text-slate-ink">
                Sending a gift? Tell us what it is — some items have restrictions
                or need extra care, and we&apos;d rather tell you before you pack
                than after.
              </p>
            </div>
          </div>
          <Accordion items={parcelFaqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy-950">
        <div className="container-site flex flex-wrap items-center justify-between gap-6 py-14">
          <div>
            <h2 className="font-display text-2xl font-medium text-paper sm:text-3xl">
              Got something to send?
            </h2>
            <p className="mt-2 text-paper/60">
              Tell us what and where — we&apos;ll handle the rest.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/get-a-quote?service=parcel" variant="accent">
              Send a Parcel <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/urgent-shipping" variant="ghost-light">
              <Undo2 className="size-4" aria-hidden /> It&apos;s urgent
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
