"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { SITE } from "@/lib/constants";
import {
  InstagramIcon,
  MailIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/portfolio/SocialIcons";

const links = [
  { href: SITE.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SITE.social.tiktok, label: "TikTok", Icon: TikTokIcon },
  { href: SITE.social.whatsapp, label: "WhatsApp", Icon: WhatsAppIcon },
  { href: SITE.social.email, label: "Email", Icon: MailIcon },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="section-pad bg-black-soft/60">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Contact</p>
          <h2 className="font-display mt-4 text-4xl font-semibold md:text-6xl">{SITE.tagline}</h2>
          <p className="mt-6 max-w-md text-muted">
            Share your vision, timeline, and goals. I&apos;ll respond with next steps within 1–2 days.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {links.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="glass flex h-12 w-12 items-center justify-center rounded-2xl text-gold transition hover:gold-glow"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-luxury p-8 md:p-10"
        >
          {sent ? (
            <p className="py-10 text-center font-display text-2xl">Message received. Talk soon.</p>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  required
                  placeholder="Name"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-gold/50"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-gold/50"
                />
              </div>
              <textarea
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="mt-5 w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-gold/50"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 inline-flex items-center gap-2 rounded-luxury bg-gradient-to-r from-gold to-orange px-8 py-4 text-sm font-semibold text-black orange-glow"
              >
                <Send className="h-4 w-4" />
                Send Message
              </motion.button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
