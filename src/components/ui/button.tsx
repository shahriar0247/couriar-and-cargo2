import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "accent" | "outline" | "ghost-light";

const styles: Record<Variant, string> = {
  primary:
    "bg-navy-900 text-paper hover:bg-accent hover:text-navy-950",
  accent:
    "bg-accent text-navy-950 hover:bg-navy-900 hover:text-paper",
  outline:
    "border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-paper",
  "ghost-light":
    "border border-paper/40 text-paper hover:border-paper hover:bg-paper/10",
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  external = false,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = `inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 ${styles[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Two-part CTA: primary + WhatsApp/call secondary, rendered conditionally. */
export function CtaRow({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  variant = "primary",
  className = "",
}: {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string | null;
  secondaryLabel?: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <ButtonLink href={primaryHref} variant={variant}>
        {primaryLabel}
      </ButtonLink>
      {secondaryHref && secondaryLabel && (
        <ButtonLink href={secondaryHref} variant="outline" external={secondaryHref.startsWith("http")}>
          {secondaryLabel}
        </ButtonLink>
      )}
    </div>
  );
}
