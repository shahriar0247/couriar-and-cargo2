import { MessageCircle, Phone, Timer, Zap } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { site, telLink, whatsappHref } from "@/config/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { UrgentForm } from "@/components/forms/urgent-form";
import { Reveal } from "@/components/motion/reveal";

export const metadata = buildMetadata({
  title: "Urgent Shipping — Bangladesh ⇄ Canada",
  description:
    "Need to ship something urgently between Bangladesh and Canada? Tell us what you're sending, where it's going and when you need it to arrive — call, WhatsApp or send the urgent form.",
  path: "/urgent-shipping",
});

export default function UrgentShipping() {
  const tel = telLink();
  const wa = whatsappHref("URGENT — I need to ship something urgently. Can we talk?");

  return (
    <>
      {/* Hero — high-alert dark, immediate call/whatsapp */}
      <section className="relative overflow-hidden bg-navy-950 pt-24 md:pt-32">
        <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="container-site relative grid gap-12 pb-16 lg:grid-cols-[1fr_1fr] lg:pb-24">
          <div>
            <Breadcrumbs items={[{ label: "Urgent Shipping" }]} light />
            <p className="kicker mt-8 flex items-center gap-2 text-accent">
              <Zap className="size-3.5" aria-hidden /> Priority channel
            </p>
            <h1 className="font-display mt-4 text-balance text-4xl font-medium leading-[1.04] text-paper sm:text-5xl lg:text-[3.75rem]">
              Need to ship something urgently?
            </h1>
            <p className="mt-6 max-w-lg text-pretty leading-relaxed text-paper/65 sm:text-lg">
              Tell us what you&apos;re sending, where it&apos;s going and when you
              need it to arrive. Our team can help you discuss the available
              shipping options.
            </p>

            {/* Fastest contact */}
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {tel && (
                <a
                  href={tel}
                  className="flex items-center justify-center gap-3 bg-accent px-6 py-5 text-sm font-semibold text-navy-950 transition-colors hover:bg-paper"
                >
                  <Phone className="size-4" aria-hidden />
                  <span className="text-left">
                    <span className="block">Call now</span>
                    <span className="block font-mono text-xs font-normal">{site.phone}</span>
                  </span>
                </a>
              )}
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 border border-[#25d366]/60 bg-[#25d366]/10 px-6 py-5 text-sm font-semibold text-paper transition-colors hover:bg-[#25d366]/20"
                >
                  <MessageCircle className="size-4 text-[#25d366]" aria-hidden />
                  <span className="text-left">
                    <span className="block">WhatsApp</span>
                    <span className="block font-mono text-xs font-normal text-paper/60">fastest written reply</span>
                  </span>
                </a>
              )}
              {!tel && !wa && (
                <p className="col-span-2 border border-white/15 p-5 text-sm text-paper/60">
                  Configure your phone and WhatsApp in <code className="font-mono text-xs">src/config/site.ts</code> to show instant-contact buttons here.
                </p>
              )}
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="kicker text-paper/40">Good to know</p>
              <ul className="mt-4 space-y-3 text-sm text-paper/65">
                <li className="flex gap-3">
                  <Timer className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  Urgent options depend on the route, shipment and carrier schedules — we confirm what&apos;s possible after reviewing your details.
                </li>
                <li className="flex gap-3">
                  <Timer className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  The more precise your deadline and shipment description, the faster we can respond with real options.
                </li>
                <li className="flex gap-3">
                  <Timer className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  We don&apos;t advertise fixed transit guarantees — every urgent case is different.
                </li>
              </ul>
            </div>
          </div>

          <Reveal delay={0.15} className="lg:pl-6">
            <UrgentForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
