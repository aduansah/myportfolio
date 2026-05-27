"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import type { PortfolioImage } from "@/lib/content-types";

type PortfolioLightboxProps = {
  images: PortfolioImage[];
  index: number;
  category: string;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function PortfolioLightbox({
  images,
  index,
  category,
  onClose,
  onChange,
}: PortfolioLightboxProps) {
  const current = images[index];

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [images.length, index, onChange, onClose]);

  if (!current) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
        <motion.button
          type="button"
          aria-label="Close gallery"
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          layoutId={`portfolio-${category}-${current.title}`}
          className="relative z-10 w-full max-w-5xl"
          initial={{ scale: 0.88, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 16 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
        >
          <div className="relative aspect-[4/5] max-h-[78vh] w-full overflow-hidden rounded-luxury border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.65)] md:aspect-[16/10]">
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 80vw"
              priority
            />
          </div>

          <div className="mt-5 flex items-end justify-between gap-4 px-1">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">{category}</p>
              <h3 className="font-display mt-2 text-2xl font-semibold text-white md:text-3xl">
                {current.title}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {index + 1} / {images.length}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-full border border-white/15 p-3 text-white transition hover:border-gold/50 hover:text-gold"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => onChange((index - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 p-3 text-white backdrop-blur-md transition hover:border-gold/50 hover:text-gold md:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => onChange((index + 1) % images.length)}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 p-3 text-white backdrop-blur-md transition hover:border-gold/50 hover:text-gold md:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
    </motion.div>
  );
}

type PortfolioStackProps = {
  images: PortfolioImage[];
  category: string;
  onOpen: (index: number) => void;
};

function stackTransform(index: number, total: number) {
  const spread = total <= 3 ? 8 : total <= 6 ? 5 : 3;
  const rotate = ((index % 5) - 2) * spread;
  const y = (index % 3) * 4 - 4;
  return { rotate, y };
}

function cardSize(total: number) {
  if (total <= 2) return "h-64 w-48 md:h-72 md:w-56";
  if (total <= 4) return "h-52 w-40 md:h-56 md:w-44";
  if (total <= 8) return "h-40 w-32 md:h-44 md:w-36";
  return "h-36 w-28 md:h-40 md:w-32";
}

export function PortfolioStack({ images, category, onOpen }: PortfolioStackProps) {
  const dense = images.length > 4;

  return (
    <div
      className={
        dense
          ? "mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
          : "mt-10 flex min-h-[320px] flex-wrap items-center justify-center gap-0 py-6 md:min-h-[380px]"
      }
    >
      {images.map((item, index) => {
        const { rotate, y } = stackTransform(index, images.length);
        const sizeClass = cardSize(images.length);

        return (
          <motion.button
            key={item.title}
            type="button"
            layoutId={`portfolio-${category}-${item.title}`}
            onClick={() => onOpen(index)}
            initial={{ opacity: 0, y: 30, rotate: rotate - 6 }}
            animate={{ opacity: 1, y: dense ? 0 : y, rotate: dense ? 0 : rotate }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 220, damping: 22 }}
            whileHover={{
              scale: 1.06,
              rotate: dense ? 0 : rotate + (index % 2 === 0 ? 2 : -2),
              zIndex: 40,
            }}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-black-soft shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-shadow hover:border-gold/40 hover:gold-glow ${
              dense ? "aspect-[4/5] w-full" : `${sizeClass} ${index > 0 ? "-ml-6 md:-ml-10" : ""}`
            }`}
            style={{ zIndex: index + 1 }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
              sizes={dense ? "160px" : "240px"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-left">
              <p className="truncate text-[10px] uppercase tracking-widest text-gold">{category}</p>
              <p className="truncate font-display text-sm font-medium text-white">{item.title}</p>
            </div>
            <div className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-gold opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
              <ZoomIn className="h-3.5 w-3.5" />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
