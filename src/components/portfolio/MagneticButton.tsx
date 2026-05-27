"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

export function MagneticButton({ href, children, variant = "primary" }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setPos({ x: (e.clientX - r.left - r.width / 2) * 0.18, y: (e.clientY - r.top - r.height / 2) * 0.18 });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={`inline-flex items-center justify-center rounded-luxury px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors ${
        variant === "primary"
          ? "bg-gold text-black hover:gold-glow"
          : "glass text-beige hover:border-gold/40 hover:text-gold"
      }`}
    >
      {children}
    </motion.a>
  );
}
