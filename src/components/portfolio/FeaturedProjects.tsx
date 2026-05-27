"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioLightbox, PortfolioStack } from "@/components/portfolio/PortfolioStack";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { parsePortfolioHash } from "@/lib/portfolio-hash";

function buildHash(tabId: string, subsectionId: string) {
  return `#projects-${tabId}-${subsectionId}`;
}

export function FeaturedProjects() {
  const { content } = useSiteContent();
  const portfolioTabs = content.portfolioTabs;
  const [activeTabId, setActiveTabId] = useState(portfolioTabs[0]?.id ?? "");
  const [activeSubId, setActiveSubId] = useState(portfolioTabs[0]?.subsections[0]?.id ?? "");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeTab = portfolioTabs.find((t) => t.id === activeTabId) ?? portfolioTabs[0];
  const activeSub =
    activeTab?.subsections.find((s) => s.id === activeSubId) ?? activeTab?.subsections[0];

  const applyHash = useCallback(
    (hash: string) => {
      const parsed = parsePortfolioHash(hash, portfolioTabs);
      if (!parsed) return;

      setActiveTabId(parsed.tabId);
      if (parsed.subsectionId) {
        setActiveSubId(parsed.subsectionId);
      }
      setLightboxIndex(null);
    },
    [portfolioTabs],
  );

  useEffect(() => {
    if (!portfolioTabs.length) return;
    if (!portfolioTabs.some((tab) => tab.id === activeTabId)) {
      setActiveTabId(portfolioTabs[0].id);
      setActiveSubId(portfolioTabs[0].subsections[0]?.id ?? "");
    }
  }, [portfolioTabs, activeTabId]);

  useEffect(() => {
    applyHash(window.location.hash);

    const onHashChange = () => applyHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [applyHash]);

  const selectTab = (tabId: string) => {
    const tab = portfolioTabs.find((t) => t.id === tabId);
    if (!tab) return;
    const firstSub = tab.subsections[0].id;
    setActiveTabId(tabId);
    setActiveSubId(firstSub);
    setLightboxIndex(null);
    window.history.replaceState(null, "", buildHash(tabId, firstSub));
  };

  const selectSub = (subsectionId: string) => {
    setActiveSubId(subsectionId);
    setLightboxIndex(null);
    window.history.replaceState(null, "", buildHash(activeTabId, subsectionId));
  };

  if (!activeTab || !activeSub) {
    return null;
  }

  return (
    <section id="projects" className="section-pad">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Featured Work</p>
            <h2 className="font-display mt-4 text-4xl font-semibold text-white md:text-5xl lg:text-6xl">
              Visual stories that sell.
            </h2>
          </div>
          <p className="text-sm text-muted">
            {activeSub.images.length} pieces · {activeSub.label}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-1 rounded-2xl border border-white/12 bg-black-soft/50 p-1.5 sm:grid-cols-4">
          {portfolioTabs.map((tab) => {
            const active = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                id={`projects-${tab.id}`}
                onClick={() => selectTab(tab.id)}
                className={`relative rounded-xl px-2 py-3.5 text-center text-sm font-semibold transition md:px-4 md:py-4 md:text-base ${
                  active ? "text-black" : "text-muted hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="portfolio-main-tab"
                    className="absolute inset-0 rounded-xl bg-gold shadow-[0_8px_24px_rgba(245,176,65,0.25)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-nowrap gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {activeTab.subsections.map((sub) => {
            const active = activeSubId === sub.id;
            return (
              <button
                key={sub.id}
                type="button"
                id={`projects-${activeTab.id}-${sub.id}`}
                onClick={() => selectSub(sub.id)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition md:px-5 md:text-xs md:tracking-wider ${
                  active
                    ? "border border-gold/35 bg-transparent text-gold"
                    : "border border-transparent bg-white/[0.04] text-muted hover:border-white/15 hover:text-white"
                }`}
              >
                {sub.label}
                {active && (
                  <motion.span
                    layoutId="portfolio-sub-indicator"
                    className="absolute inset-x-4 -bottom-px h-px bg-gold/80"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="glass mt-8 rounded-luxury border border-white/10 p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTabId}-${activeSubId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-2 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gold">{activeTab.label}</p>
                  <h3 className="font-display mt-1 text-2xl font-semibold text-white">
                    {activeSub.label}
                  </h3>
                </div>
                <p className="hidden text-xs text-muted md:block">Click any piece to expand</p>
              </div>

              <PortfolioStack
                images={activeSub.images}
                category={activeSub.label}
                onOpen={setLightboxIndex}
              />

              {activeSub.images.length > 4 && (
                <div className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {activeSub.images.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className={`shrink-0 rounded-xl border px-3 py-2 text-left text-xs transition ${
                        lightboxIndex === index
                          ? "border-gold/50 bg-gold/10 text-gold"
                          : "border-white/10 text-muted hover:text-white"
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <PortfolioLightbox
            images={activeSub.images}
            index={lightboxIndex}
            category={activeSub.label}
            onClose={() => setLightboxIndex(null)}
            onChange={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
