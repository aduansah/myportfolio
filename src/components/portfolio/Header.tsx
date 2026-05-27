"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between section-pad !py-0">
        <a href="#home" className="flex items-center" aria-label={SITE.name}>
          {!logoError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={SITE.logo}
              alt={SITE.name}
              width={168}
              height={40}
              className="h-9 w-auto object-contain md:h-10"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="font-display text-xl font-semibold text-white">
              The Kofi<span className="text-gold">.</span>
            </span>
          )}
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted transition hover:text-gold">
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-luxury bg-gold px-5 py-2.5 text-sm font-semibold text-black transition hover:gold-glow"
          >
            Book Me
          </a>
        </nav>

        <button
          type="button"
          className="rounded-xl p-2 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass overflow-hidden border-t border-white/10 lg:hidden"
          >
            <div className="flex flex-col gap-5 section-pad">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="text-xl" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
