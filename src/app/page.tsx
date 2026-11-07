import Link from "next/link";
import {
  ArrowRight,
  ArrowLeftRight,
  Boxes,
  FileText,
  Home as HomeIcon,
  MessageCircle,
  Package,
  Phone,
  Plane,
  Ship,
  Zap,
} from "lucide-react";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { site, telLink, whatsappHref } from "@/config/site";
import { RouteMap } from "@/components/visual/route-map";
import {
  ParcelIllustration,
  PlaneIllustration,
  ShipIllustration,
} from "@/components/visual/illustrations";
import { QuickQuote } from "@/components/forms/quick-quote";
import { SectionHeading } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { faqs } from "@/lib/data/faqs";

export const metadata = buildMetadata({
  title: "Cargo & Courier Between Bangladesh and Canada",
  description:
    "Send parcels, documents and cargo between Bangladesh and Canada by air or sea — in both directions, with assistance for urgent shipments. Get a quote today.",
  path: "/",
});

const homeFaqs = faqs.filter((f) =>
  ["Do you ship both ways between Bangladesh and Canada?",
    "How long does shipping take?",
    "I need something shipped urgently — what should I do?",
    "How much does shipping cost?",
  ].includes(f.question),
);

export default function Home() {
  const tel = telLink();
  const wa = whatsappHref("Hi — I need help with an urgent shipment.");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs)) }}
      />

      {/* ============ 1 · HERO ============ */}
      <section className="relative overflow-hidden bg-navy-950 pt-16 md:pt-[4.5rem]">
        <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-site relative grid gap-10 pb-16 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:pb-24 lg:pt-20">
          <div>
            <Reveal>
              <p className="kicker text-paper/50">
                <span className="text-accent">●</span> Bangladesh ⇄ Canada corridor
              </p>
              <h1 className="font-display mt-5 text-balance text-4xl font-medium leading-[1.04] text-paper sm:text-5xl lg:text-[4rem]">
                Cargo &amp; courier between Bangladesh&nbsp;and Canada.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-paper/65 sm:text-lg">
                Send parcels, documents and cargo by air or sea. Shipping in both
                directions — with real help for urgent shipments.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/get-a-quote" variant="accent">
                Get a Quote
              </ButtonLink>
              <ButtonLink href="#services" variant="ghost-light">
                Explore Services
              </ButtonLink>
            </Reveal>

            <Reveal delay={0.25} className="mt-10">
              <RouteMap className="hidden w-full max-w-2xl lg:block" />
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:pt-2">
            <QuickQuote />
            <div className="mt-4 flex items-center gap-4 border border-white/10 bg-white/[0.03] px-5 py-4">
              <Zap className="size-5 shrink-0 text-accent" aria-hidden />
              <p className="text-sm leading-snug text-paper/70">
                In a hurry?{" "}
                <Link href="/urgent-shipping" className="font-semibold text-paper underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
                  Tell us your deadline
                </Link>{" "}
                — we&apos;ll discuss the fastest workable options.
              </p>
            </div>
          </Reveal>
        </div>

        {/* corridor ticker */}
        <div className="border-t border-white/10">
          <div className="container-site flex flex-wrap gap-x-10 gap-y-2 py-4 font-mono text-[0.6875rem] tracking-[0.18em] text-paper/40 uppercase">
            <span>DAC → YYZ</span><span>YYZ → DAC</span><span>Air freight</span><span>Sea freight</span><span>Parcels &amp; docs</span><span>Urgent inquiries</span>
          </div>
        </div>
      </section>

      {/* ============ 2 · SERVICES ============ */}
      <section id="services" className="container-site py-20 lg:py-28">
        <SectionHeading
          index="01"
          kicker="What we move"
          title="Three ways to ship between the two countries."
          intro="Every shipment is different — tell us what you're sending and we'll help you pick the right service. No fixed prices online because honest pricing needs real details."
        />
        <RevealGroup className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {[
            {
              icon: Plane,
              art: <PlaneIllustration className="w-full" />,
              title: "Air Cargo",
              body: "For time-sensitive freight and larger consignments that can't wait for the sea lane. Personal and commercial shipments.",
              href: "/services/air-cargo",
              cta: "Air cargo details",
              tag: "FASTEST",
            },
            {
              icon: Ship,
              art: <ShipIllustration className="w-full" />,
              title: "Sea Cargo",
              body: "The economical choice for bigger loads — household goods, commercial inventory and bulk cargo between the two coasts.",
              href: "/services/sea-cargo",
              cta: "Sea cargo details",
              tag: "BEST VALUE",
            },
            {
              icon: Package,
              art: <ParcelIllustration className="w-full" />,
              title: "Parcel & Express",
              body: "Documents, personal parcels and smaller packages — courier service with the human touch, in both directions.",
              href: "/services/parcel-courier",
              cta: "Parcel details",
              tag: "EVERYDAY",
            },
          ].map((s) => (
            <RevealItem key={s.title}>
              <article className="group flex h-full flex-col bg-paper p-7 lg:p-9">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.625rem] tracking-[0.2em] text-slate-ink/70">{s.tag}</span>
                  <s.icon className="size-5 text-navy-900 transition-colors group-hover:text-accent" aria-hidden />
                </div>
                <div className="mt-6 border border-line bg-white p-4 transition-colors group-hover:border-navy-900/20">
                  {s.art}
                </div>
                <h3 className="font-display mt-7 text-2xl font-medium text-navy-900">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-ink">{s.body}</p>
                <Link
                  href={s.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 transition-colors hover:text-accent"
                >
                  {s.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ============ 3 · URGENT BAND ============ */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="container-site relative grid items-center gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
          <div>
            <p className="kicker text-accent">Urgent shipments</p>
            <h2 className="font-display mt-4 text-balance text-3xl font-medium leading-tight text-paper sm:text-4xl">
              On a deadline? Talk to a person, not a portal.
            </h2>
            <p className="mt-4 max-w-lg text-pretty leading-relaxed text-paper/65">
              Call or message us with what you&apos;re sending and when it needs to
              arrive. We&apos;ll tell you honestly what&apos;s possible — no false
              promises, no fake countdown timers.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {tel && (
              <a
                href={tel}
                className="flex items-center justify-center gap-3 bg-accent px-6 py-4 text-sm font-semibold text-navy-950 transition-colors hover:bg-paper"
              >
                <Phone className="size-4" aria-hidden /> Call {site.phone}
              </a>
            )}
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border border-paper/30 px-6 py-4 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper/10"
              >
                <MessageCircle className="size-4" aria-hidden /> WhatsApp us now
              </a>
            )}
            <ButtonLink href="/urgent-shipping" variant="ghost-light" className="justify-center">
              Urgent shipping form <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ============ 4 · ROUTE VISUALIZATION ============ */}
      <section className="border-b border-line bg-paper-warm/60">
        <div className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <SectionHeading
              index="02"
              kicker="The corridor"
              title="One route, both directions, three services."
              intro="Everything we do runs on the Bangladesh–Canada corridor. Dhaka to Toronto is the spine — with air freight for speed, sea freight for volume and courier for the everyday."
            />
            <RevealGroup className="mt-10 space-y-4">
              {[
                { icon: ArrowLeftRight, title: "Both directions", body: "Outbound from Dhaka or inbound from Toronto — the same corridor, run in reverse." },
                { icon: Plane, title: "Air for urgency", body: "When the calendar matters more than the budget." },
                { icon: Ship, title: "Sea for volume", body: "When the load is heavy and the timeline is kind." },
              ].map((r) => (
                <RevealItem key={r.title} className="flex gap-4 border border-line bg-paper p-5">
                  <r.icon className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{r.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-ink">{r.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.2} className="mt-8">
              <ButtonLink href="/shipping-routes" variant="outline">
                Explore the routes <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal className="border border-line bg-navy-950 p-6 lg:p-8">
            <RouteMap className="w-full" />
          </Reveal>
        </div>
      </section>

      {/* ============ 5 · WHY US ============ */}
      <section className="container-site py-20 lg:py-28">
        <SectionHeading
          index="03"
          kicker="Why choose us"
          title="A corridor specialist, not a call centre."
        />
        <RevealGroup className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "A", title: "Route focus",
              body: "We work one corridor. That means practical knowledge of the airports, ports, paperwork and pitfalls between Bangladesh and Canada.",
            },
            {
              n: "B", title: "Human replies",
              body: "WhatsApp, phone or email — you reach a person who knows shipping, not a chatbot with a script.",
            },
            {
              n: "C", title: "Honest quotes",
              body: "No teaser rates that balloon later. We quote on real weights, real dimensions and real routes.",
            },
            {
              n: "D", title: "Both ends covered",
              body: "Whether your shipment leaves Dhaka or Toronto, you're dealing with a team that understands both ends.",
            },
          ].map((c) => (
            <RevealItem key={c.title} className="bg-paper p-7">
              <span className="font-display text-3xl text-accent">{c.n}</span>
              <h3 className="mt-5 text-base font-semibold text-navy-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-ink">{c.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ============ 6 · PROCESS PREVIEW ============ */}
      <section className="border-y border-line bg-white">
        <div className="container-site py-20 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              index="04"
              kicker="How it works"
              title="Six steps, zero mystery."
              className="!max-w-xl"
            />
            <ButtonLink href="/how-it-works" variant="outline" className="mb-1">
              Full process <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
          <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["01", "Request a quote", "Tell us the route, the shipment and the timeline."],
              ["02", "Confirm details", "We discuss options and agree the arrangement together."],
              ["03", "Hand it over", "Prepare the shipment and hand it over as agreed."],
              ["04", "Documents & processing", "We complete the paperwork side with you."],
              ["05", "Ship", "Your cargo travels the corridor to the destination country."],
              ["06", "Deliver or collect", "Final delivery or collection per the confirmed service."],
            ].map(([n, t, b]) => (
              <li key={n} className="border-t-2 border-navy-900 pt-5">
                <span className="font-mono text-xs tracking-[0.2em] text-accent">{n}</span>
                <h3 className="mt-2 text-base font-semibold text-navy-900">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-ink">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ 7 · SHIPMENT CATEGORIES ============ */}
      <section className="container-site py-20 lg:py-24">
        <SectionHeading
          index="05"
          kicker="What people send"
          title="From a single envelope to a full household."
        />
        <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: FileText, label: "Documents", note: "Certificates, papers, contracts" },
            { icon: Package, label: "Personal parcels", note: "Gifts, clothing, care packages" },
            { icon: Boxes, label: "Commercial goods", note: "Inventory, samples, product lines" },
            { icon: HomeIcon, label: "Household goods", note: "Moves, relocations, personal effects" },
          ].map((c) => (
            <Link
              key={c.label}
              href="/get-a-quote"
              className="group bg-paper p-7 transition-colors hover:bg-navy-950"
            >
              <c.icon className="size-6 text-navy-900 transition-colors group-hover:text-accent" aria-hidden />
              <p className="mt-5 font-display text-xl font-medium text-navy-900 transition-colors group-hover:text-paper">
                {c.label}
              </p>
              <p className="mt-1.5 text-sm text-slate-ink transition-colors group-hover:text-paper/60">
                {c.note}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.2em] text-slate-ink/60 transition-colors group-hover:text-accent">
                GET A QUOTE <ArrowRight className="size-3" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ 8 · FAQ PREVIEW ============ */}
      <section className="border-t border-line bg-paper-warm/60">
        <div className="container-site grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
          <div>
            <SectionHeading
              index="06"
              kicker="Common questions"
              title="Straight answers before you ship."
            />
            <ButtonLink href="/faq" variant="outline" className="mt-8">
              All questions <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
          <Accordion items={homeFaqs} />
        </div>
      </section>

      {/* ============ 9 · FINAL CTA ============ */}
      <section className="bg-navy-950">
        <div className="container-site py-20 text-center lg:py-28">
          <Reveal>
            <p className="kicker text-paper/40">Ready when you are</p>
            <h2 className="font-display mx-auto mt-5 max-w-2xl text-balance text-4xl font-medium leading-[1.05] text-paper sm:text-5xl">
              Tell us what you&apos;re sending.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-paper/60">
              Two minutes of details gets you a real answer on route, service and
              price.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/get-a-quote" variant="accent">Get a Quote</ButtonLink>
              {wa && (
                <ButtonLink href={wa} variant="ghost-light" external>
                  WhatsApp us instead
                </ButtonLink>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
