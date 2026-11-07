import {
  ArrowRight,
  CalendarClock,
  ClipboardList,
  PackageCheck,
  Scale,
  Timer,
} from "lucide-react";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { whatsappHref } from "@/config/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PlaneIllustration } from "@/components/visual/illustrations";
import { SectionHeading } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { faqs } from "@/lib/data/faqs";

export const metadata = buildMetadata({
  title: "Air Cargo — Bangladesh to Canada & Canada to Bangladesh",
  description:
    "Air freight between Bangladesh and Canada for time-sensitive personal and commercial shipments. Learn when air cargo is right, how to prepare and how to get a quote.",
  path: "/services/air-cargo",
});

const airFaqs = faqs.filter((f) => f.category === "Air Cargo" || f.category === "Urgent");

export default function AirCargo() {
  const wa = whatsappHref("Hi — I'd like an air cargo quote.");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(airFaqs)) }}
      />

      {/* Hero — aviation editorial: oversized type over flight-line diagram */}
      <section className="bg-navy-950 pt-24 md:pt-32">
        <div className="container-site">
          <Breadcrumbs items={[{ label: "Services" }, { label: "Air Cargo" }]} light />
          <div className="mt-10 grid items-end gap-10 pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:pb-20">
            <div>
              <p className="kicker text-accent">Service 01 — Air</p>
              <h1 className="font-display mt-4 text-balance text-4xl font-medium leading-[1.04] text-paper sm:text-5xl lg:text-6xl">
                Air cargo for time-sensitive shipments.
              </h1>
              <p className="mt-6 max-w-xl text-pretty leading-relaxed text-paper/65 sm:text-lg">
                When the calendar is the constraint, air freight is the answer.
                Personal effects, commercial goods and larger consignments —
                moved between Bangladesh and Canada at flight speed.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/get-a-quote?service=air" variant="accent">
                  Get an Air Cargo Quote
                </ButtonLink>
                {wa && (
                  <ButtonLink href={wa} variant="ghost-light" external>
                    WhatsApp us
                  </ButtonLink>
                )}
              </div>
            </div>
            <Reveal className="border border-white/15 bg-white/[0.03] p-6">
              <PlaneIllustration className="w-full [&_path]:stroke-paper [&_rect]:stroke-paper [&_line]:stroke-paper [&_ellipse]:stroke-paper [&_text]:fill-paper/70" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* What it is / who it's for — asymmetric editorial */}
      <section className="container-site grid gap-14 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            index="01"
            kicker="The service"
            title="Fast lanes through the sky."
            intro="Air cargo is freight carried on aircraft — faster than sea, priced for urgency. It suits shipments where days matter, where the goods are compact and valuable, or where the sea schedule simply doesn't fit."
          />
        </div>
        <RevealGroup className="space-y-px border border-line bg-line">
          {[
            {
              icon: Timer,
              title: "When speed is the point",
              body: "Documents due, samples for a deadline, a product launch, a personal need that can't wait for an ocean crossing.",
            },
            {
              icon: PackageCheck,
              title: "Personal and commercial",
              body: "From a family's urgent parcel to a company's regular freight — air cargo scales from single packages to palletized consignments.",
            },
            {
              icon: CalendarClock,
              title: "Time-sensitive considerations",
              body: "Air freight runs on flight schedules, capacity and cut-off times. We'll discuss realistic departure and arrival windows for your dates — rather than quoting a transit time we can't stand behind.",
            },
            {
              icon: Scale,
              title: "Weight vs. volume",
              body: "Airlines charge on actual or volumetric weight, whichever is greater. Bulky-but-light cargo can cost more than expected — we calculate this properly before quoting.",
            },
          ].map((r) => (
            <RevealItem key={r.title} className="flex gap-5 bg-paper p-7">
              <r.icon className="mt-1 size-5 shrink-0 text-accent" aria-hidden />
              <div>
                <h3 className="text-base font-semibold text-navy-900">{r.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-ink">{r.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Air vs sea comparison — technical table */}
      <section className="border-y border-line bg-white">
        <div className="container-site py-20 lg:py-24">
          <SectionHeading
            index="02"
            kicker="Choosing wisely"
            title="Air or sea — the honest trade-off."
          />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-navy-900">
                  <th className="kicker py-4 pr-6 text-slate-ink">Factor</th>
                  <th className="kicker py-4 pr-6 text-navy-900">Air cargo</th>
                  <th className="kicker py-4 text-slate-ink">Sea cargo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-sm">
                {[
                  ["Speed", "Days, typically", "Weeks, typically"],
                  ["Cost basis", "Higher — priced on chargeable weight", "Lower — economical for volume"],
                  ["Best for", "Urgent, compact, higher-value goods", "Large, heavy, less urgent loads"],
                  ["Shipment size", "Parcels to pallets", "Boxes to full containers"],
                  ["Scheduling", "Frequent departures, strict cut-offs", "Sailing schedules, port timelines"],
                ].map(([factor, air, sea]) => (
                  <tr key={factor}>
                    <td className="py-4 pr-6 font-medium text-navy-900">{factor}</td>
                    <td className="py-4 pr-6 text-navy-900">
                      <span className="mr-2 inline-block size-1.5 bg-accent align-middle" aria-hidden />
                      {air}
                    </td>
                    <td className="py-4 text-slate-ink">{sea}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-slate-ink">
            Not sure which fits? Most people aren&apos;t — send the shipment
            details and we&apos;ll compare honestly for your case.
          </p>
        </div>
      </section>

      {/* Preparation checklist */}
      <section className="container-site grid gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <SectionHeading
          index="03"
          kicker="Getting ready"
          title="How to prepare an air shipment."
        />
        <ol className="space-y-0 divide-y divide-line border-y border-line">
          {[
            "Describe the goods honestly — contents, quantity, declared value.",
            "Weigh and measure each package; volumetric weight matters.",
            "Pack for handling: rigid boxes, sealed seams, no loose items.",
            "Label each piece clearly with sender and receiver details.",
            "Share your timeline — cut-off times are real constraints, not suggestions.",
          ].map((step, i) => (
            <li key={step} className="flex gap-5 py-5">
              <span className="font-mono text-xs tracking-widest text-accent">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-sm leading-relaxed text-navy-900">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Quote requirements */}
      <section className="bg-navy-900">
        <div className="container-site grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <SectionHeading
              index="04"
              kicker="For an accurate quote"
              title="What we'll ask you."
              light
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/get-a-quote?service=air" variant="accent">
                Get an Air Cargo Quote <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </div>
          <ul className="grid content-start gap-3 sm:grid-cols-2">
            {[
              "Origin & destination cities",
              "What the goods are",
              "Approximate weight & dimensions",
              "Number of packages",
              "When it needs to arrive",
              "Commercial or personal",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 border border-white/10 bg-white/[0.03] p-4 text-sm text-paper/80">
                <ClipboardList className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section className="container-site grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
        <SectionHeading index="05" kicker="Air cargo FAQs" title="Asked and answered." />
        <Accordion items={airFaqs} />
      </section>

      {/* Final CTA */}
      <section className="border-t border-line bg-paper-warm/60">
        <div className="container-site flex flex-wrap items-center justify-between gap-6 py-14">
          <div>
            <h2 className="font-display text-2xl font-medium text-navy-900 sm:text-3xl">
              Ready to fly it?
            </h2>
            <p className="mt-2 text-slate-ink">
              Send the details — we&apos;ll come back with a real air cargo quote.
            </p>
          </div>
          <ButtonLink href="/get-a-quote?service=air" variant="accent">
            Get an Air Cargo Quote <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
