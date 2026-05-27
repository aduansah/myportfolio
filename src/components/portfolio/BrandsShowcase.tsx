"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BRANDS } from "@/lib/constants";

const doubled = [...BRANDS, ...BRANDS];

function BrandLogo({
  name,
  logo,
  rev,
  index,
}: {
  name: string;
  logo: string;
  rev?: number;
  index: number;
}) {
  const [failed, setFailed] = useState(false);
  const src = rev ? `${logo}?v=${rev}` : logo;
  const animationDelay = `${(index % BRANDS.length) * 0.45}s`;

  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="group relative flex h-24 shrink-0 items-center justify-center px-1 md:h-28 md:px-2"
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={name}
          width={220}
          height={88}
          className="brand-logo-color max-h-20 w-auto object-contain md:max-h-24"
          style={{ animationDelay }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="brand-logo-color font-display whitespace-nowrap bg-gradient-to-r from-[#F6E8D5] via-[#F5B041] to-[#FF8C42] bg-clip-text text-center text-2xl font-semibold uppercase tracking-[0.1em] text-transparent md:text-3xl"
          style={{ animationDelay }}
        >
          {name}
        </span>
      )}
    </motion.div>
  );
}

export function BrandsShowcase() {
  return (
    <section className="relative overflow-hidden border-y border-white/8 bg-black-soft/40 py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,176,65,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl section-pad !py-0">
        <p className="text-center text-xs uppercase tracking-[0.35em] text-gold">
          Brands I&apos;ve Worked With
        </p>

        <div className="brand-marquee-wrap relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent md:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent md:w-20" />

          <div className="brand-marquee-track items-center gap-6 md:gap-10">
            {doubled.map((brand, index) => (
              <BrandLogo key={`${brand.name}-${index}`} {...brand} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
