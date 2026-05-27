"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { gsap } from "gsap";
import { HERO_COLLAGE, SITE } from "@/lib/constants";
import { MagneticButton } from "@/components/portfolio/MagneticButton";

const tileLayout = [
  {
    className:
      "left-[1%] top-[2%] w-[31%] aspect-[3/4] md:left-[5%] md:top-[7%] md:w-[14%]",
    tilt: -7,
  },
  {
    className:
      "left-[33%] top-[1%] w-[31%] aspect-[3/4] md:left-[18%] md:top-[4%] md:w-[13%]",
    tilt: 5,
  },
  {
    className:
      "right-[1%] top-[3%] w-[31%] aspect-[3/4] md:right-[9%] md:top-[8%] md:w-[14%]",
    tilt: -4,
  },
  {
    className:
      "left-[2%] top-[26%] w-[31%] aspect-[3/4] md:left-[11%] md:top-auto md:bottom-[15%] md:w-[13%]",
    tilt: 6,
  },
  {
    className:
      "left-[34%] top-[25%] w-[31%] aspect-[3/4] md:right-[27%] md:left-auto md:top-auto md:bottom-[9%] md:w-[14%]",
    tilt: -5,
  },
  {
    className:
      "right-[2%] top-[27%] w-[31%] aspect-[3/4] md:right-[4%] md:top-auto md:bottom-[17%] md:w-[12%]",
    tilt: 4,
  },
];

function HeroCollageTile({
  src,
  index,
  mouseX,
  mouseY,
}: {
  src: string;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const layout = tileLayout[index];
  const parallaxX = useTransform(mouseX, (value) => value * (6 + index * 2));
  const parallaxY = useTransform(mouseY, (value) => value * (5 + index * 1.5));

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      img.style.opacity = "1";
    }
  }, [src]);

  return (
    <motion.div
      className={`hero-collage-tile absolute overflow-hidden rounded-2xl border border-white/[0.08] ${layout.className}`}
      style={{ zIndex: index + 1, rotate: layout.tilt }}
      initial={{ opacity: 0, y: 20, scale: 0.97, rotate: layout.tilt - 4 }}
      animate={{ opacity: 0.46, y: 0, scale: 1, rotate: layout.tilt }}
      transition={{ duration: 0.9, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{
          y: [0, -3, 2, 0],
          rotate: [0, 0.4, -0.3, 0],
        }}
        transition={{
          duration: 10 + index,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.35,
        }}
      >
        <motion.div className="relative h-full w-full" style={{ x: parallaxX, y: parallaxY }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={src}
            alt=""
            className="h-full w-full scale-[1.08] object-cover object-center"
            loading="eager"
            decoding="async"
            fetchPriority={index < 3 ? "high" : "auto"}
            onLoad={(event) => {
              event.currentTarget.style.opacity = "1";
            }}
            style={{ opacity: 0, transition: "opacity 0.6s ease" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 24, mass: 0.7 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 60, damping: 24, mass: 0.7 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 70,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const updatePointer = (clientX: number, clientY: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((clientX - rect.left) / rect.width - 0.5);
    mouseY.set((clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100svh] overflow-hidden"
      onMouseMove={(e) => updatePointer(e.clientX, e.clientY)}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        if (touch) updatePointer(touch.clientX, touch.clientY);
      }}
    >
      <div className="absolute inset-0">
        {HERO_COLLAGE.map((src, index) => (
          <HeroCollageTile
            key={src}
            src={src}
            index={index}
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 z-[10] bg-gradient-to-b from-black/72 via-black/58 to-[#050505]" />
        <div className="pointer-events-none absolute inset-0 z-[10] bg-[radial-gradient(circle_at_68%_18%,rgba(245,176,65,0.08),transparent_42%)]" />
      </div>

      <div className="relative z-20 flex min-h-[100svh] flex-col justify-end">
        <div className="mx-auto w-full max-w-7xl section-pad pb-20 pt-32">
          <p className="hero-reveal text-xs uppercase tracking-[0.4em] text-gold">Portfolio</p>
          <h1 className="font-display hero-reveal mt-5 text-5xl font-semibold leading-[0.95] text-white md:text-7xl lg:text-8xl">
            The Kofi{" "}
            <span className="bg-gradient-to-r from-white via-beige to-gold bg-clip-text text-transparent">
              Ansah
            </span>
          </h1>
          <p className="hero-reveal mt-6 max-w-2xl text-lg text-beige/80 md:text-2xl">{SITE.title}</p>
          <div className="hero-reveal mt-10 flex flex-wrap gap-4">
            <MagneticButton href="#projects">View Work</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Book Me
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
