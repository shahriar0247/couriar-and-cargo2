"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { navLinks, serviceLinks, site, telLink, hasPhone } from "@/config/site";
import { Logo } from "@/components/visual/logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation (adjust-during-render, no effect needed)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileOpen(false);
    setServicesOpen(false);
  }

  // Close dropdown on outside click / Escape
  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!dropRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setServicesOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const tel = telLink();
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  // Pages whose top section is dark navy → header uses light text until scrolled
  const darkTop = ["/", "/services/air-cargo", "/services/sea-cargo", "/urgent-shipping", "/shipping-routes"].includes(pathname);
  const dark = darkTop && !scrolled && !mobileOpen;
  const linkColor = dark ? "text-paper" : "text-navy-900";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-paper/95 backdrop-blur-md shadow-[0_1px_0_0_var(--color-line)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
          <Logo light={dark} />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          <div ref={dropRef} className="relative">
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((v) => !v)}
              className={`flex items-center gap-1.5 text-[0.8125rem] font-medium tracking-wide transition-colors link-underline ${linkColor}`}
              data-active={isActive("/services") || isActive("/urgent-shipping") ? "" : undefined}
            >
              Services
              <ChevronDown
                className={`size-3.5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={reduce ? {} : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? {} : { opacity: 0, y: 4 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 border border-line bg-white shadow-[0_24px_60px_-20px_rgb(16_28_46/0.25)]"
                  role="menu"
                >
                  {serviceLinks.map((s, i) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      role="menuitem"
                      className={`group flex items-baseline justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-paper ${
                        i > 0 ? "border-t border-line" : ""
                      }`}
                    >
                      <span>
                        <span className="block text-sm font-semibold text-navy-900">{s.label}</span>
                        <span className="block text-xs text-slate-ink">{s.blurb}</span>
                      </span>
                      <span
                        aria-hidden
                        className="font-mono text-[0.625rem] tracking-widest text-slate-ink/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
                      >
                        →
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[0.8125rem] font-medium tracking-wide transition-colors link-underline ${linkColor}`}
              data-active={isActive(l.href) ? "" : undefined}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          {hasPhone && tel && (
            <a
              href={tel}
              className={`flex items-center gap-2 font-mono text-xs font-medium tracking-wide transition-colors hover:text-accent ${linkColor}`}
            >
              <Phone className="size-3.5" aria-hidden />
              {site.phone}
            </a>
          )}
          <Link
            href="/get-a-quote"
            className={`px-5 py-2.5 text-[0.8125rem] font-semibold tracking-wide transition-colors ${
              dark
                ? "bg-paper text-navy-900 hover:bg-accent hover:text-navy-950"
                : "bg-navy-900 text-paper hover:bg-accent hover:text-navy-950"
            }`}
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/get-a-quote"
            className={`px-4 py-2 text-xs font-semibold transition-colors ${
              dark ? "bg-paper text-navy-900" : "bg-navy-900 text-paper"
            }`}
          >
            Get a Quote
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={`grid size-10 place-items-center transition-colors ${linkColor}`}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? {} : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
          >
            <div className="container-site py-6">
              <p className="kicker text-slate-ink">Services</p>
              <div className="mt-3 divide-y divide-line border-y border-line">
                {serviceLinks.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center justify-between py-4"
                  >
                    <span>
                      <span className="block font-display text-lg text-navy-900">{s.label}</span>
                      <span className="block text-xs text-slate-ink">{s.blurb}</span>
                    </span>
                    <span aria-hidden className="font-mono text-accent">→</span>
                  </Link>
                ))}
              </div>

              <p className="kicker mt-8 text-slate-ink">Company</p>
              <div className="mt-3 grid grid-cols-2 gap-x-6">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="border-b border-line py-3.5 text-sm font-medium text-navy-900"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              {hasPhone && tel && (
                <a
                  href={tel}
                  className="mt-8 flex items-center justify-center gap-2 border border-navy-900 py-3.5 text-sm font-semibold text-navy-900"
                >
                  <Phone className="size-4" aria-hidden />
                  Call {site.phone}
                </a>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
