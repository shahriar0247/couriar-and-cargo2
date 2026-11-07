import {
  ArrowRight,
  Box,
  ClipboardList,
  Container,
  FileCheck,
  Scale,
  Ship,
  TrendingDown,
} from "lucide-react";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { whatsappHref } from "@/config/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ShipIllustration } from "@/components/visual/illustrations";
import { SectionHeading } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { faqs } from "@/lib/data/faqs";

export const metadata = buildMetadata({
  title: "Sea Cargo — Ocean Freight Between Bangladesh and Canada",
  description:
    "Sea freight between Bangladesh and Canada for larger shipments, household goods, commercial cargo and bulk loads. Containers, consolidation, documentation and quotes.",
  path: "/services/sea-cargo",
});

const seaFaqs = faqs.filter((f) => f.category === "Sea Cargo" || f.category === "Customs");

export default function SeaCargo() {
  const wa = whatsappHref("Hi — I'd like a sea cargo quote.");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(seaFaqs)) }}
      />

      {/* Hero — full-bleed navy, container-stack illustration at scale */}
      <section className="relative overflow-hidden bg-navy-950 pt-24 md:pt-32">
        <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="container-site relative pb-16 lg:pb-24">
          <Breadcrumbs items={[{ label: "Services" }, { label: "Sea Cargo" }]} light />
          <div className="mt-10 max-w-3xl">
            <p className="kicker text-accent">Service 02 — Ocean</p>
            <h1 className="font-display mt-4 text-balance text-4xl font-medium leading-[1.04] text-paper sm:text-5xl lg:text-6xl">
              Sea freight for larger loads.
            </h1>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-paper/65 sm:text-lg">
              When the shipment is heavy, bulky or the timeline is flexible,
              the ocean is the smartest lane between Bangladesh and Canada.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/get-a-quote?service=sea" variant="accent">
                Get a Sea Cargo Quote
              </ButtonLink>
              {wa && <ButtonLink href={wa} variant="ghost-light" external>WhatsApp us</ButtonLink>}
            </div>
          </div>
          <Reveal className="mt-14 border-t border-white/15 pt-10" delay={0.15}>
            <ShipIllustration className="w-full max-w-4xl [&_path]:stroke-paper/80 [&_rect]:stroke-paper/80 [&_line]:stroke-paper/60 [&_ellipse]:stroke-paper/60 [&_text]:fill-paper/60" />
          </Reveal>
        </div>
      </section>

      {/* Why sea freight — data-led editorial */}
      <section className="container-site py-20 lg:py-28">
        <SectionHeading
          index="01"
          kicker="The case for ocean"
          title="Slower by design. Cheaper by physics."
          intro="A container ship moves tonnes for a fraction of the air freight cost per kilo. For big loads, sea freight isn't the fallback — it's the correct answer."
        />
        <RevealGroup className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-3">
          {[
            {
              icon: TrendingDown,
              title: "Cost per kilogram",
              body: "Dramatically lower than air on sizeable shipments. The heavier the load, the stronger the case for sea.",
            },
            {
              icon: Container,
              title: "Room for the big stuff",
              body: "Furniture, household goods, commercial inventory, machinery — cargo that would be impractical or unaffordable by air.",
            },
            {
              icon: Ship,
              title: "Consolidated options",
              body: "Don't need a whole container? Smaller sea shipments can share container space where consolidation is available for your route.",
            },
          ].map((c) => (
            <RevealItem key={c.title} className="bg-paper p-8">
              <c.icon className="size-6 text-accent" aria-hidden />
              <h3 className="mt-5 font-display text-xl font-medium text-navy-900">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-ink">{c.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Personal & commercial — split editorial */}
      <section className="border-y border-line bg-white">
        <div className="container-site grid gap-px lg:grid-cols-2 lg:bg-line lg:border lg:border-line lg:my-24">
          <div className="bg-white p-8 lg:p-12">
            <p className="kicker text-slate-ink">Personal</p>
            <h2 className="font-display mt-4 text-3xl font-medium text-navy-900">
              Household goods and personal effects.
            </h2>
            <p className="mt-4 leading-relaxed text-slate-ink">
              Moving between countries? Sending belongings to family? Sea freight
              handles the volume that parcels can&apos;t — furniture, boxes,
              appliances, the contents of a life. We&apos;ll discuss packing,
              documentation and realistic timelines for your shipment.
            </p>
            <ul className="mt-6 space-y-2.5">
              {["Household moves and relocations", "Care packages at scale", "Personal effects and belongings"].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-navy-900">
                  <Box className="size-4 text-accent" aria-hidden /> {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-navy-950 p-8 lg:p-12">
            <p className="kicker text-paper/50">Commercial</p>
            <h2 className="font-display mt-4 text-3xl font-medium text-paper">
              Inventory and commercial cargo.
            </h2>
            <p className="mt-4 leading-relaxed text-paper/65">
              Restocking inventory, moving product between markets, exporting
              goods — sea freight is how serious volume travels. Tell us your
              cargo, quantities and schedule and we&apos;ll work out the route.
            </p>
            <ul className="mt-6 space-y-2.5">
              {["Commercial goods and inventory", "Bulk cargo inquiries", "Regular shipping arrangements"].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-paper/85">
                  <Box className="size-4 text-accent" aria-hidden /> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Weight/volume/dimensions + docs */}
      <section className="container-site grid gap-14 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <SectionHeading
            index="02"
            kicker="The numbers"
            title="Weight, volume, dimensions."
            intro="Sea freight pricing revolves around how much space and weight your cargo occupies. Measure before you ask — it makes quotes faster and more accurate."
          />
          <div className="mt-8 border border-line bg-paper p-6">
            <p className="kicker text-slate-ink">Measuring tip</p>
            <p className="mt-3 text-sm leading-relaxed text-navy-900">
              Measure each piece in centimetres (L × W × H) and weigh in kilograms.
              For loose items, an honest estimate of box count beats a guess at
              volume.
            </p>
          </div>
        </div>
        <div>
          <SectionHeading
            index="03"
            kicker="Paperwork"
            title="Preparation and documentation."
            intro="Ocean freight crosses borders formally — a packing list, item values, sender/receiver details and any goods-specific paperwork. Requirements differ by cargo and destination; we walk you through yours before anything ships."
          />
          <ul className="mt-8 space-y-3">
            {[
              { icon: FileCheck, text: "Itemized contents with declared values" },
              { icon: ClipboardList, text: "Accurate sender and receiver details" },
              { icon: Scale, text: "Real weights and dimensions per piece" },
            ].map((i) => (
              <li key={i.text} className="flex items-center gap-3 border border-line bg-paper p-4 text-sm text-navy-900">
                <i.icon className="size-4 shrink-0 text-accent" aria-hidden /> {i.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sea vs air — compact inversion of air page table */}
      <section className="bg-paper-warm/60 border-y border-line">
        <div className="container-site py-20">
          <SectionHeading index="04" kicker="Deciding" title="Sea or air — think in calendars and kilos." />
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
            <div className="bg-navy-950 p-8">
              <p className="kicker text-accent">Choose sea when</p>
              <ul className="mt-5 space-y-3 text-sm text-paper/80">
                <li>→ The load is heavy, bulky or numerous</li>
                <li>→ Weeks of transit fit your timeline</li>
                <li>→ Cost efficiency matters more than speed</li>
                <li>→ You&apos;re moving household or commercial volume</li>
              </ul>
            </div>
            <div className="bg-white p-8">
              <p className="kicker text-slate-ink">Choose air when</p>
              <ul className="mt-5 space-y-3 text-sm text-slate-ink">
                <li>→ Days, not weeks, is the requirement</li>
                <li>→ The shipment is compact and time-critical</li>
                <li>→ Value justifies the higher freight cost</li>
                <li>→ A deadline is fixed and real</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container-site grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
        <SectionHeading index="05" kicker="Sea cargo FAQs" title="Before you book the boat." />
        <Accordion items={seaFaqs} />
      </section>

      {/* Final CTA */}
      <section className="bg-navy-950">
        <div className="container-site flex flex-wrap items-center justify-between gap-6 py-14">
          <div>
            <h2 className="font-display text-2xl font-medium text-paper sm:text-3xl">
              Big load? Let&apos;s price the ocean.
            </h2>
            <p className="mt-2 text-paper/60">Send the cargo details — we&apos;ll come back with a real sea freight quote.</p>
          </div>
          <ButtonLink href="/get-a-quote?service=sea" variant="accent">
            Get a Sea Cargo Quote <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
