import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import {
  hasEmail,
  hasPhone,
  hasWhatsapp,
  mailLink,
  site,
  telLink,
  whatsappHref,
} from "@/config/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactForm } from "@/components/forms/contact-form";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata = buildMetadata({
  title: "Contact Us — Bangladesh ⇄ Canada Shipping",
  description:
    "Contact us about shipping between Bangladesh and Canada — WhatsApp, phone, email or the contact form. Ask about air cargo, sea freight or parcels.",
  path: "/contact",
});

export default function Contact() {
  const tel = telLink();
  const mail = mailLink("Shipping inquiry");
  const wa = whatsappHref("Hi — I'd like to ask about shipping.");

  return (
    <>
      <section className="bg-paper-warm/50 pt-24 md:pt-32">
        <div className="container-site pb-14">
          <Breadcrumbs items={[{ label: "Contact" }]} />
          <div className="mt-10 max-w-2xl">
            <p className="kicker text-accent">Reach us</p>
            <h1 className="font-display mt-4 text-balance text-4xl font-medium leading-[1.04] text-navy-900 sm:text-5xl">
              Talk to a person.
            </h1>
            <p className="mt-5 text-pretty leading-relaxed text-slate-ink sm:text-lg">
              WhatsApp is usually the fastest reply. Phone for urgent. Email or
              the form for the details.
            </p>
          </div>
        </div>
      </section>

      <section className="container-site grid gap-12 pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:pb-28">
        {/* Channels */}
        <div className="space-y-px border border-line bg-line">
          {hasWhatsapp && wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 bg-navy-950 p-6 text-paper transition-colors hover:bg-navy-900"
            >
              <span className="flex items-center gap-4">
                <MessageCircle className="size-6 text-[#25d366]" aria-hidden />
                <span>
                  <span className="block font-semibold">WhatsApp</span>
                  <span className="block font-mono text-xs text-paper/60">{site.whatsapp}</span>
                </span>
              </span>
              <span className="font-mono text-[0.625rem] tracking-[0.2em] text-accent">FASTEST →</span>
            </a>
          )}

          {hasPhone && tel && (
            <a
              href={tel}
              className="group flex items-center justify-between gap-4 bg-white p-6 transition-colors hover:bg-paper"
            >
              <span className="flex items-center gap-4">
                <Phone className="size-6 text-accent" aria-hidden />
                <span>
                  <span className="block font-semibold text-navy-900">Phone</span>
                  <span className="block font-mono text-xs text-slate-ink">{site.phone}</span>
                </span>
              </span>
              <span className="font-mono text-[0.625rem] tracking-[0.2em] text-slate-ink">URGENT →</span>
            </a>
          )}

          {hasEmail && mail && (
            <a
              href={mail}
              className="group flex items-center justify-between gap-4 bg-white p-6 transition-colors hover:bg-paper"
            >
              <span className="flex items-center gap-4">
                <Mail className="size-6 text-accent" aria-hidden />
                <span>
                  <span className="block font-semibold text-navy-900">Email</span>
                  <span className="block font-mono text-xs text-slate-ink">{site.email}</span>
                </span>
              </span>
              <span className="font-mono text-[0.625rem] tracking-[0.2em] text-slate-ink">DETAILS →</span>
            </a>
          )}

          {(site.offices.bangladesh || site.offices.canada) && (
            <div className="bg-white p-6">
              <p className="kicker text-slate-ink">Offices</p>
              <div className="mt-4 space-y-4">
                {site.offices.bangladesh && (
                  <p className="flex items-start gap-3 text-sm text-navy-900">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                    <span className="whitespace-pre-line">{site.offices.bangladesh}</span>
                  </p>
                )}
                {site.offices.canada && (
                  <p className="flex items-start gap-3 text-sm text-navy-900">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                    <span className="whitespace-pre-line">{site.offices.canada}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {site.hours && (
            <div className="flex items-center gap-3 bg-white p-6 text-sm text-navy-900">
              <Clock className="size-4 shrink-0 text-accent" aria-hidden />
              {site.hours}
            </div>
          )}

          {!hasPhone && !hasEmail && !hasWhatsapp && (
            <div className="bg-paper p-6 text-sm text-slate-ink">
              No contact channels configured yet — set phone, WhatsApp and email
              in <code className="font-mono text-xs">src/config/site.ts</code>.
            </div>
          )}
        </div>

        {/* Form */}
        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl font-medium text-navy-900">Or send a message</h2>
          <p className="mt-2 text-sm text-slate-ink">
            For quotes with full shipment details,{" "}
            <a href="/get-a-quote" className="font-semibold text-navy-900 underline decoration-accent underline-offset-4">
              the quote form
            </a>{" "}
            is even better.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </Reveal>
      </section>

      {/* Urgent strip */}
      <section className="bg-navy-950">
        <div className="container-site flex flex-wrap items-center justify-between gap-6 py-12">
          <div>
            <h2 className="font-display text-2xl font-medium text-paper">Something urgent?</h2>
            <p className="mt-1 text-paper/60">Skip the form — call or WhatsApp directly.</p>
          </div>
          <ButtonLink href="/urgent-shipping" variant="accent">
            Urgent shipping
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
