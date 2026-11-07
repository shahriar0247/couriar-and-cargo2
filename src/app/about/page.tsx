import { ArrowLeftRight, ArrowRight, MessageSquare, Route } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { site, whatsappHref } from "@/config/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ShipIllustration } from "@/components/visual/illustrations";
import { SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata = buildMetadata({
  title: `About ${site.name} — Bangladesh ⇄ Canada Shipping`,
  description:
    "About us: a shipping company focused on the Bangladesh–Canada corridor — air cargo, sea freight and courier services, in both directions.",
  path: "/about",
});

export default function About() {
  const wa = whatsappHref("Hi — I'd like to learn more about your services.");

  return (
    <>
      {/* Editorial hero — oversized statement type */}
      <section className="bg-paper-warm/50 pt-24 md:pt-32">
        <div className="container-site pb-16 lg:pb-24">
          <Breadcrumbs items={[{ label: "About" }]} />
          <div className="mt-12 max-w-4xl">
            <p className="kicker text-accent">About us</p>
            <h1 className="font-display mt-5 text-balance text-4xl font-medium leading-[1.06] text-navy-900 sm:text-5xl lg:text-[4.25rem]">
              We move the things that matter between two homes.
            </h1>
          </div>
          <Reveal className="mt-14 max-w-4xl">
            <ShipIllustration className="w-full border border-line bg-white p-6 lg:p-10" />
          </Reveal>
        </div>
      </section>

      {/* The focus */}
      <section className="container-site grid gap-14 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            index="01"
            kicker="The focus"
            title="One corridor, done properly."
          />
        </div>
        <div className="space-y-5 text-[0.9375rem] leading-relaxed text-slate-ink sm:text-base">
          <p>
            {site.name} exists for one reason: the Bangladesh–Canada shipping
            corridor. Not every route on earth — this one. Families sending
            parcels home, businesses moving goods between markets, documents
            that need to cross an ocean quickly.
          </p>
          <p>
            We work three ways: <strong className="text-navy-900">air cargo</strong> for
            time-sensitive freight, <strong className="text-navy-900">sea cargo</strong> for
            larger loads, and <strong className="text-navy-900">courier service</strong> for
            parcels and documents. In both directions — Bangladesh to Canada
            and Canada to Bangladesh.
          </p>
          <p>
            We&apos;d rather tell you something is slower, more expensive or not
            possible than promise the moon and disappoint you. Straightforward
            communication isn&apos;t a tagline here — it&apos;s how the whole
            business works.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-line bg-white">
        <div className="container-site py-20">
          <SectionHeading index="02" kicker="How we work" title="Three rules we run on." />
          <RevealGroup className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
            {[
              {
                icon: Route,
                title: "Route over reach",
                body: "We specialize rather than generalize. Deep familiarity with one corridor beats shallow coverage of fifty.",
              },
              {
                icon: MessageSquare,
                title: "People over portals",
                body: "You talk to a person. Quotes come from real details, answers come from real knowledge.",
              },
              {
                icon: ArrowLeftRight,
                title: "Both ends matter",
                body: "A shipment has two ends and two customs halls. We think about both, because problems happen at the handoffs.",
              },
            ].map((p) => (
              <RevealItem key={p.title} className="bg-white p-8">
                <p.icon className="size-6 text-accent" aria-hidden />
                <h3 className="mt-5 font-display text-xl font-medium text-navy-900">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-ink">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Who we serve */}
      <section className="container-site grid gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <SectionHeading
          index="03"
          kicker="Who we serve"
          title="Families, students, businesses."
          intro="The people who use us most: families bridging two countries, students and newcomers shipping their lives, small businesses moving goods between the Bangladeshi and Canadian markets, and anyone with something important to send."
        />
        <div className="grid content-start gap-3">
          {[
            "Families sending parcels and documents home",
            "Students and newcomers relocating between countries",
            "Small businesses shipping commercial goods",
            "Anyone who needs a person to ask, not a portal",
          ].map((who) => (
            <p key={who} className="border border-line bg-paper p-5 text-sm font-medium text-navy-900">
              {who}
            </p>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950">
        <div className="container-site flex flex-wrap items-center justify-between gap-6 py-14">
          <div>
            <h2 className="font-display text-2xl font-medium text-paper sm:text-3xl">
              Say hello. Ask anything.
            </h2>
            <p className="mt-2 text-paper/60">
              The easiest way to learn more is to ask us directly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {wa && <ButtonLink href={wa} variant="accent" external>WhatsApp us</ButtonLink>}
            <ButtonLink href="/contact" variant="ghost-light">
              Contact page <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
