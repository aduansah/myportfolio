"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";

export function CaseStudies() {
  const { content } = useSiteContent();
  const caseStudies = content.caseStudies;
  const [index, setIndex] = useState(0);

  if (!caseStudies.length) {
    return null;
  }

  const study = caseStudies[index];
  const hasMultiple = caseStudies.length > 1;

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + caseStudies.length) % caseStudies.length);
  };

  return (
    <section id="case-studies" className="relative overflow-hidden bg-black-soft section-pad">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Case Studies</p>
        <h2 className="font-display mt-4 text-4xl font-semibold md:text-5xl">Problem to result.</h2>

        <div className="relative mt-10 md:mt-14">
          <AnimatePresence mode="wait">
            <motion.article
              key={study.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="glass w-full overflow-hidden rounded-luxury"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[4/3] min-h-[240px] lg:aspect-auto lg:min-h-[540px]">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <p className="text-xs uppercase tracking-[0.3em] text-gold">{study.client}</p>
                  <h3 className="font-display mt-3 text-2xl font-semibold md:text-3xl">{study.title}</h3>
                  <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted md:mt-8 md:space-y-5">
                    {[
                      ["Problem", study.problem],
                      ["Process", study.process],
                      ["Solution", study.solution],
                      ["Final Result", study.result],
                    ].map(([label, text]) => (
                      <div key={label}>
                        <p className="mb-1 text-xs uppercase tracking-widest text-gold">{label}</p>
                        <p>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          {hasMultiple && (
            <>
              <button
                type="button"
                aria-label="Previous case study"
                onClick={() => goTo(index - 1)}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-2 text-white backdrop-blur-md transition hover:border-gold/40 hover:text-gold md:left-4 md:p-3"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next case study"
                onClick={() => goTo(index + 1)}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-2 text-white backdrop-blur-md transition hover:border-gold/40 hover:text-gold md:right-4 md:p-3"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2">
                {caseStudies.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show ${item.client} case study`}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-8 bg-gold" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-3 text-center text-xs text-muted">
                {index + 1} / {caseStudies.length}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
