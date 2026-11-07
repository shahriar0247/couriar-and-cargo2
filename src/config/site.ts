/**
 * Central business configuration.
 *
 * Every value below is read from environment variables first, falling back to
 * the literals shown here. Replace the literals / set the env vars before
 * going live — components hide contact details that are left empty.
 *
 * Env vars:
 *   NEXT_PUBLIC_SITE_URL          e.g. https://example.com
 *   NEXT_PUBLIC_COMPANY_NAME
 *   NEXT_PUBLIC_COMPANY_LEGAL_NAME
 *   NEXT_PUBLIC_PHONE             international format, e.g. +1416…
 *   NEXT_PUBLIC_WHATSAPP          digits only, e.g. 88017…
 *   NEXT_PUBLIC_EMAIL
 *   NEXT_PUBLIC_OFFICE_BD         multiline address, \n separated
 *   NEXT_PUBLIC_OFFICE_CA         multiline address, \n separated
 *   NEXT_PUBLIC_HOURS             e.g. "Sat–Thu 09:00–19:00 (BST)"
 *   QUOTE_API_URL                 FastAPI endpoint, e.g. http://localhost:8000
 *   QUOTE_API_KEY                 shared secret sent to the API (server-side only)
 */

const env = (key: string, fallback = "") =>
  (typeof process !== "undefined" && process.env[key]) || fallback;

export const site = {
  name: env("NEXT_PUBLIC_COMPANY_NAME", "Corridor Cargo"),
  legalName: env("NEXT_PUBLIC_COMPANY_LEGAL_NAME", "Corridor Cargo Ltd."),
  url: env("NEXT_PUBLIC_SITE_URL", "http://localhost:3000").replace(/\/$/, ""),
  tagline: "Bangladesh ⇄ Canada shipping",

  // ── DEMO placeholders — replace with real details (or set env vars) ──
  phone: env("NEXT_PUBLIC_PHONE", "+880 1700-000000"),
  whatsapp: env("NEXT_PUBLIC_WHATSAPP", "8801700000000"),
  email: env("NEXT_PUBLIC_EMAIL", "hello@corridorcargo.com"),

  offices: {
    // City-level only — never show a street address you don't actually have.
    bangladesh: env("NEXT_PUBLIC_OFFICE_BD", "Dhaka, Bangladesh"),
    canada: env("NEXT_PUBLIC_OFFICE_CA", "Toronto, Canada"),
  },
  hours: env("NEXT_PUBLIC_HOURS", "Sat–Thu · 09:00–19:00 (BST)"),

  social: {
    facebook: env("NEXT_PUBLIC_SOCIAL_FB"),
    instagram: env("NEXT_PUBLIC_SOCIAL_IG"),
    linkedin: env("NEXT_PUBLIC_SOCIAL_LI"),
  },

  /** Form backend — see src/app/api/quote/route.ts */
  api: {
    quoteUrl: env("QUOTE_API_URL"),
    apiKey: env("QUOTE_API_KEY"),
  },
} as const;

export const hasPhone = site.phone.length > 0;
export const hasWhatsapp = site.whatsapp.length > 0;
export const hasEmail = site.email.length > 0;

export const telLink = () =>
  site.phone ? `tel:${site.phone.replace(/[^\d+]/g, "")}` : null;

export const whatsappHref = (message?: string) => {
  if (!site.whatsapp) return null;
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const mailLink = (subject?: string) => {
  if (!site.email) return null;
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${site.email}${q}`;
};

export const navLinks = [
  { href: "/shipping-routes", label: "Shipping Routes" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const serviceLinks = [
  {
    href: "/services/air-cargo",
    label: "Air Cargo",
    blurb: "Time-sensitive freight",
  },
  {
    href: "/services/sea-cargo",
    label: "Sea Cargo",
    blurb: "Larger & heavier loads",
  },
  {
    href: "/services/parcel-courier",
    label: "Parcel & Express",
    blurb: "Parcels and documents",
  },
  {
    href: "/urgent-shipping",
    label: "Urgent Shipping",
    blurb: "Fast turnaround inquiries",
  },
] as const;
