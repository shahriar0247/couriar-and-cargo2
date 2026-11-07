import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  hasEmail,
  hasPhone,
  hasWhatsapp,
  mailLink,
  navLinks,
  serviceLinks,
  site,
  telLink,
  whatsappHref,
} from "@/config/site";
import { Logo } from "@/components/visual/logo";
import { Year } from "@/components/layout/year";

export function Footer() {
  const tel = telLink();
  const mail = mailLink();
  const wa = whatsappHref();

  return (
    <footer className="bg-navy-950 text-paper">
      {/* Corridor strip */}
      <div className="border-b border-white/10">
        <div className="container-site flex flex-wrap items-center justify-between gap-4 py-6">
          <p className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase text-paper/60">
            Dhaka ⇄ Toronto · Air · Sea · Courier
          </p>
          <div className="flex flex-wrap gap-3">
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-paper/25 px-4 py-2 text-xs font-semibold text-paper transition-colors hover:border-accent hover:text-accent"
              >
                WhatsApp Us
              </a>
            )}
            <Link
              href="/get-a-quote"
              className="bg-accent px-4 py-2 text-xs font-semibold text-navy-950 transition-colors hover:bg-paper"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>

      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/60">
            Parcels, documents and cargo between Bangladesh and Canada — by air,
            by sea, in both directions.
          </p>
        </div>

        <nav aria-label="Services">
          <p className="kicker text-paper/40">Services</p>
          <ul className="mt-4 space-y-2.5">
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-paper/75 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="kicker text-paper/40">Company</p>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-paper/75 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="kicker text-paper/40">Reach us</p>
          <ul className="mt-4 space-y-3 text-sm text-paper/75">
            {hasPhone && tel && (
              <li>
                <a href={tel} className="flex items-start gap-2.5 transition-colors hover:text-accent">
                  <Phone className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {site.phone}
                </a>
              </li>
            )}
            {hasWhatsapp && wa && (
              <li>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 transition-colors hover:text-accent"
                >
                  <MessageIcon />
                  WhatsApp {site.whatsapp}
                </a>
              </li>
            )}
            {hasEmail && mail && (
              <li>
                <a href={mail} className="flex items-start gap-2.5 transition-colors hover:text-accent">
                  <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {site.email}
                </a>
              </li>
            )}
            {site.offices.bangladesh && (
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span className="whitespace-pre-line">{site.offices.bangladesh}</span>
              </li>
            )}
            {site.offices.canada && (
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span className="whitespace-pre-line">{site.offices.canada}</span>
              </li>
            )}
            {!hasPhone && !hasEmail && !hasWhatsapp && (
              <li className="text-paper/50">
                Contact details are configured in <code className="font-mono text-xs">site.ts</code>.
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-wrap items-center justify-between gap-3 py-5">
          <p className="text-xs text-paper/40">
            © <Year /> {site.legalName}
          </p>
          <div className="flex gap-6 text-xs text-paper/50">
            <Link href="/legal/privacy" className="hover:text-paper">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-paper">Terms</Link>
            <Link href="/legal/shipping-terms" className="hover:text-paper">Shipping Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 fill-current" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.7-1.3 1.2-1.9 1.2-.5.1-1.1.1-1.8-.1-2.2-.7-3.9-2-5.4-3.7-1.4-1.6-2.4-3.4-2.5-4.5-.1-1 .4-1.9 1-2.5.4-.4.9-.5 1.2-.5h.9c.3 0 .6 0 .9.7l1 2.3c.1.2.1.4 0 .6l-.5.8-.6.7c-.2.2-.2.4 0 .7.5.9 1.9 2.3 3.4 3 .5.2.8.3 1 .1l1.4-1.6c.2-.3.5-.3.8-.2l2.2 1c.3.2.5.3.6.5.1.2.1.8-.2 1.4Z" />
    </svg>
  );
}
