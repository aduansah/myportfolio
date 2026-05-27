"use client";

import { useEffect, useRef } from "react";
import { BadgeCheck, Mail, MapPin, Phone, User } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT, SITE } from "@/lib/constants";
import { SkillRing } from "@/components/portfolio/SkillRing";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="about" className="section-pad">
      <div className="mx-auto max-w-7xl">
        <div className="about-card glass rounded-luxury p-6 md:p-10 gold-glow">
          <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:items-start">
            <div className="mx-auto lg:mx-0">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/40 to-orange/30 blur-xl" />
                <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-gold/80 md:h-52 md:w-52">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={encodeURI(ABOUT.portrait)}
                    alt={SITE.name}
                    className="absolute inset-0 h-full w-full scale-105 object-cover object-[center_38%]"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display flex items-center gap-2 text-3xl font-semibold text-white md:text-4xl">
                About Me.
                <BadgeCheck className="h-7 w-7 text-gold" />
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-beige/80 md:text-lg">
                {ABOUT.bio}
              </p>
            </div>
          </div>

          <div className="about-card mt-12 grid gap-8 xl:grid-cols-[1fr_320px]">
            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">Software Skills</p>
              <div className="grid grid-cols-3 gap-x-4 gap-y-8 md:flex md:flex-wrap md:justify-start md:gap-8">
                {ABOUT.tools.map((tool) => (
                  <SkillRing key={tool.name} icon={tool.icon} level={tool.level} name={tool.name} />
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {["Photography", "Graphic Design", "Web Development", "Videography"].map((skill) => (
                  <div
                    key={skill}
                    className="rounded-luxury bg-gradient-to-br from-gold to-orange px-4 py-5 text-center text-sm font-semibold text-black"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-4 text-sm">
                <p className="flex items-center gap-3 text-beige">
                  <Mail className="h-4 w-4 text-gold" /> {SITE.email}
                </p>
                <p className="flex items-center gap-3 text-beige">
                  <Phone className="h-4 w-4 text-gold" /> {SITE.phone}
                </p>
                <p className="flex items-center gap-3 text-beige">
                  <MapPin className="h-4 w-4 text-gold" /> {SITE.location}
                </p>
                <p className="flex items-center gap-3 text-beige">{SITE.instagram}</p>
              </div>

              <div className="rounded-luxury border border-dashed border-gold/50 bg-black-soft/50 p-5">
                <p className="flex items-center gap-2 text-sm font-medium text-gold">
                  <User className="h-4 w-4" /> Available
                </p>
                <p className="mt-2 text-sm text-muted">{SITE.availability}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
