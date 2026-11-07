import { ArrowRight, FileCheck, Package, Plane, Ship } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { whatsappHref } from "@/config/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { RouteMap } from "@/components/visual/route-map";
import { SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata = buildMetadata({
  title: "Shipping Routes — Bangladesh ⇄ Canada",
  description:
    "Shipping routes between Bangladesh and Canada in both directions — air cargo, sea freight and courier options from Dhaka to Toronto, Toronto to Dhaka and beyond.",
  path: "/shipping-routes",
});

const DIR = [
  {
    id: "bd-to-ca",
    heading: "Bangladesh → Canada",
    kicker: "Outbound",
    body: "From Dhaka and across Bangladesh to Canadian cities — parcels to family, documents for applications, commercial goods for the market.",
    origin: "Dhaka · DAC",
    dest: "Toronto · YYZ",
    questions: [
      "Which Canadian city is it going to?",
      "Personal shipment or commercial?",
      "Any deadline or date it must arrive by?",
    ],
    direction: "bd-to-ca" as const,
  },
  {
    id: "ca-to-bd",
    heading: "Canada → Bangladesh",
    kicker: "Inbound",
    body: "From Toronto, Vancouver, Montréal and beyond back to Bangladesh — gifts, documents, purchases and personal effects headed home.",
    origin: "Toronto · YYZ",
    dest: "Dhaka · DAC",
    questions: [
      "Which Canadian city are you sending from?",
      "Where in Bangladesh should it arrive?",
      "What exactly are you sending?",
    ],
    direction: "ca-to-bd" as const,
  },
];

const MODES = [
  { icon: Plane, name: "Air", note: "Time-sensitive freight" },
  { icon: Ship, name: "Sea", note: "Larger, heavier loads" },
  { icon: Package, name: "Courier", note: "Parcels and documents" },
];

export default function ShippingRoutes() {
  const wa = whatsappHref("Hi — question about a shipping route.");

  return (
    <>
      {/* Hero — map-led */}
      <section className="bg-navy-950 pt-24 md:pt-32">
        <div className="container-site pb-16 lg:pb-20">
          <Breadcrumbs items={[{ label: "Shipping Routes" }]} light />
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="kicker text-accent">The corridor</p>
              <h1 className="font-display mt-4 text-balance text-4xl font-medium leading-[1.04] text-paper sm:text-5xl lg:text-6xl">
                One route. Both directions.
              </h1>
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-paper/65 sm:text-lg">
                Every service we offer runs on the Bangladesh–Canada corridor —
                air for urgency, sea for volume, courier for the everyday.
              </p>
            </div>
            <Reveal>
              <RouteMap className="w-full" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Direction sections */}
      {DIR.map((d, i) => (
        <section key={d.id} className={i % 2 ? "bg-white border-y border-line" : "bg-paper"}>
          <div className="container-site py-20 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="kicker text-slate-ink">
                  <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> {d.kicker}
                </p>
                <h2 className="font-display mt-4 text-3xl font-medium text-navy-900 sm:text-4xl lg:text-5xl">
                  {d.heading}
                </h2>
                <p className="mt-5 max-w-lg text-pretty leading-relaxed text-slate-ink">{d.body}</p>

                {/* endpoints */}
                <div className="mt-8 flex items-center gap-4 border border-line bg-white p-5">
                  <span className="font-mono text-xs tracking-widest text-navy-900">{d.origin}</span>
                  <span className="h-px flex-1 bg-navy-900/20 relative">
                    <Plane className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 text-accent" aria-hidden />
                  </span>
                  <span className="font-mono text-xs tracking-widest text-navy-900">{d.dest}</span>
                </div>

                {/* modes */}
                <div className="mt-4 grid grid-cols-3 gap-px border border-line bg-line">
                  {MODES.map((m) => (
                    <div key={m.name} className="bg-paper p-4 text-center">
                      <m.icon className="mx-auto size-5 text-navy-900" aria-hidden />
                      <p className="mt-2 text-sm font-semibold text-navy-900">{m.name}</p>
                      <p className="mt-0.5 text-[0.6875rem] text-slate-ink">{m.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-8">
                <div>
                  <p className="kicker text-slate-ink">Questions we&apos;ll ask</p>
                  <ul className="mt-4 space-y-3">
                    {d.questions.map((q) => (
                      <li key={q} className="flex items-start gap-3 border border-line bg-white p-4 text-sm text-navy-900">
                        <ArrowRight className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href={`/get-a-quote?direction=${d.direction}`} variant="primary">
                    Quote this direction <ArrowRight className="size-4" aria-hidden />
                  </ButtonLink>
                  {wa && <ButtonLink href={wa} variant="outline" external>Ask on WhatsApp</ButtonLink>}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Customs note */}
      <section className="bg-navy-900">
        <div className="container-site grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <SectionHeading
            kicker="Customs & documentation"
            title="Both ends have paperwork. We help with yours."
            light
          />
          <RevealGroup className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: FileCheck, text: "Customs inspection is normal — international shipments are checked in both countries." },
              { icon: FileCheck, text: "Duties and fees depend on the goods, their value and the destination's rules — never identical across shipments." },
              { icon: FileCheck, text: "Accurate contents descriptions and values prevent most delays — honesty is the fastest paperwork." },
              { icon: FileCheck, text: "We explain what typically applies to your shipment when we quote — before anything moves." },
            ].map((c, i) => (
              <RevealItem key={i} className="flex items-start gap-4 border border-white/10 bg-white/[0.03] p-5">
                <c.icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <p className="text-sm leading-relaxed text-paper/75">{c.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
