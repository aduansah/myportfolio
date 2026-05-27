"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ServiceIcon } from "@/components/portfolio/ServiceIcons";
import { SERVICES } from "@/lib/constants";

function navigateToPortfolio(href: string) {
  window.history.pushState(null, "", href);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Services() {
  return (
    <section id="services" className="section-pad bg-black-soft/50">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Services</p>
        <h2 className="font-display mt-4 text-4xl font-semibold text-white md:text-5xl">
          Crafted for premium brands.
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <Link
                href={service.href}
                onClick={(event) => {
                  event.preventDefault();
                  navigateToPortfolio(service.href);
                }}
                className="group block rounded-luxury border border-white/10 bg-[#121212]/90 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-gold/40 hover:gold-glow"
              >
                <div className="relative mb-6 inline-flex">
                  <div className="absolute -inset-1 rounded-[18px] bg-gradient-to-br from-gold/25 to-orange/10 opacity-0 blur-md transition duration-500 group-hover:opacity-100" />
                  <div className="relative rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.12] via-[#121212] to-orange/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-500 group-hover:border-gold/45 group-hover:from-gold/20 group-hover:to-orange/15 group-hover:shadow-[0_0_28px_rgba(245,176,65,0.22)]">
                    <ServiceIcon
                      id={service.icon as "camera" | "palette" | "code" | "video"}
                      className="h-9 w-9 transition duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="font-display text-2xl font-semibold text-white">{service.title}</h3>
                <p className="mt-4 leading-relaxed text-beige/70">{service.description}</p>
                <p className="mt-5 text-xs uppercase tracking-widest text-gold opacity-0 transition group-hover:opacity-100">
                  View portfolio →
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
