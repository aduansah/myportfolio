import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/8 section-pad !py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex items-start gap-3 max-w-xl">
          <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-gold" />
          <p className="text-sm leading-relaxed text-beige/80">
            I believe in creating work that is not just seen, but felt — blending photography,
            design, and development into one cohesive experience.
          </p>
        </div>
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
