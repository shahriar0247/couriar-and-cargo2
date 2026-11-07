import { ArrowRight, FileWarning } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { whatsappHref } from "@/config/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProcessTimeline } from "@/components/visual/process-timeline";
import { SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata = buildMetadata({
  title: "How Shipping Works — Bangladesh ⇄ Canada",
  description:
    "From quote request to delivery: how shipping between Bangladesh and Canada works, step by step — including customs, documents and final delivery.",
  path: "/how-it-works",
});

export const steps = [
  {
    n: "01",
    title: "Request a quote",
    body: "Send the route, what you're shipping and your timeline through the quote form — or just message us on WhatsApp. Two minutes of details.",
    note: "You give: route, shipment, timing",
  },
  {
    n: "02",
    title: "Discuss and confirm",
    body: "We come back with real options — service, arrangement and price. You ask questions; we answer them plainly. Then we agree the details together.",
    note: "You get: options, honest answers, a quote",
  },
  {
    n: "03",
    title: "Prepare and hand over",
    body: "Pack your shipment using our guidance, then hand it over under the arrangement we confirmed — drop-off or another agreed method.",
    note: "You give: a properly packed shipment",
  },
  {
    n: "04",
    title: "Documents and processing",
    body: "We complete the necessary shipping documents and process the consignment — contents descriptions, values, sender and receiver details.",
    note: "Handled together: paperwork, declaration",
  },
  {
    n: "05",
    title: "Ship to destination",
    body: "Your cargo travels the corridor by air or sea toward the destination country. Timelines depend on service, schedules and customs.",
    note: "In transit: Bangladesh ⇄ Canada",
  },
  {
    n: "06",
    title: "Deliver or collect",
    body: "At destination, the shipment is delivered or made ready for collection according to the service confirmed at the start.",
    note: "You get: delivery or collection, as agreed",
  },
];

export default function HowItWorks() {
  const wa = whatsappHref("Hi — I have a question about how shipping works.");

  return (
    <>
      <section className="bg-paper-warm/50 pt-24 md:pt-32">
        <div className="container-site pb-16">
          <Breadcrumbs items={[{ label: "How It Works" }]} />
          <div className="mt-10 max-w-2xl">
            <p className="kicker text-accent">The process</p>
            <h1 className="font-display mt-4 text-balance text-4xl font-medium leading-[1.04] text-navy-900 sm:text-5xl lg:text-6xl">
              Six steps. Zero mystery.
            </h1>
            <p className="mt-6 text-pretty leading-relaxed text-slate-ink sm:text-lg">
              International shipping sounds complicated because most companies
              explain it badly. Here&apos;s the whole thing, honestly.
            </p>
          </div>
        </div>
      </section>

      <section className="container-site py-16 lg:py-24">
        <ProcessTimeline steps={steps} />
      </section>

      {/* Customs explainer */}
      <section className="border-y border-line bg-white">
        <div className="container-site grid gap-10 py-16 lg:grid-cols-[0.7fr_1.3fr] lg:py-20">
          <div>
            <FileWarning className="size-7 text-accent" aria-hidden />
            <SectionHeading
              kicker="About customs"
              title="The part everyone worries about."
              className="mt-5"
            />
          </div>
          <div className="space-y-4 text-[0.9375rem] leading-relaxed text-slate-ink">
            <p>
              Every international shipment passes customs in both countries. That&apos;s
              normal — and it&apos;s why accurate descriptions and honest values matter
              more than anything else you do.
            </p>
            <p>
              Duties, taxes and fees may apply depending on the goods, their value
              and the destination&apos;s rules. These aren&apos;t identical for every
              shipment, which is why we discuss them case by case rather than
              printing a generic chart.
            </p>
            <p>
              Some items are restricted or prohibited entirely — dangerous goods,
              perishables, currency, and anything either country doesn&apos;t allow.
              Tell us what you&apos;re sending upfront and we&apos;ll tell you honestly
              whether it can go.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950">
        <div className="container-site flex flex-wrap items-center justify-between gap-6 py-14">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-paper sm:text-3xl">
              Step one takes two minutes.
            </h2>
            <p className="mt-2 text-paper/60">Start the quote — we&apos;ll handle steps two through six together.</p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/get-a-quote" variant="accent">
              Get a Quote <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            {wa && <ButtonLink href={wa} variant="ghost-light" external>WhatsApp us</ButtonLink>}
          </div>
        </div>
      </section>
    </>
  );
}
