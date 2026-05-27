import type { CaseStudy, SiteContent, Testimonial } from "@/lib/content-types";
import { CASE_STUDIES, PORTFOLIO_TABS, TESTIMONIALS } from "@/lib/constants";

function slugId(prefix: string, index: number) {
  return `${prefix}-${index + 1}`;
}

export function getDefaultSiteContent(): SiteContent {
  return {
    portfolioTabs: JSON.parse(JSON.stringify(PORTFOLIO_TABS)),
    caseStudies: CASE_STUDIES.map((study, index) => ({
      id: slugId("case", index),
      ...study,
    })) satisfies CaseStudy[],
    testimonials: TESTIMONIALS.map((item, index) => ({
      id: slugId("testimonial", index),
      ...item,
    })) satisfies Testimonial[],
  };
}
