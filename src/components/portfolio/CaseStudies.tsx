"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CASE_STUDIES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const scrollDistance = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="case-studies" className="relative bg-black-soft">
      <div className="section-pad pb-0">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Case Studies</p>
          <h2 className="font-display mt-4 text-4xl font-semibold md:text-5xl">Problem to result.</h2>
        </div>
      </div>

      <div ref={trackRef} className="flex w-max gap-8 section-pad !pt-12">
        {CASE_STUDIES.map((study) => (
          <article
            key={study.client}
            className="glass w-[min(90vw,920px)] shrink-0 overflow-hidden rounded-luxury"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[300px] lg:min-h-[540px]">
                <Image src={study.image} alt={study.title} fill className="object-cover" sizes="920px" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <p className="text-xs uppercase tracking-[0.3em] text-gold">{study.client}</p>
                <h3 className="font-display mt-3 text-3xl font-semibold">{study.title}</h3>
                <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted">
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
          </article>
        ))}
      </div>
    </section>
  );
}
