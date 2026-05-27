import type { PortfolioTab } from "@/lib/content-types";

export function parsePortfolioHash(hash: string, tabs: PortfolioTab[]) {
  const cleaned = hash.replace("#", "");
  if (!cleaned.startsWith("projects-")) return null;

  const slug = cleaned.replace("projects-", "");
  for (const tab of tabs) {
    if (slug === tab.id) {
      return { tabId: tab.id, subsectionId: tab.subsections[0]?.id ?? null };
    }
    for (const sub of tab.subsections) {
      if (slug === `${tab.id}-${sub.id}`) {
        return { tabId: tab.id, subsectionId: sub.id };
      }
    }
  }
  return null;
}
