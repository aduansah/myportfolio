export type PortfolioImage = {
  title: string;
  image: string;
};

export type PortfolioSubsection = {
  id: string;
  label: string;
  images: PortfolioImage[];
};

export type PortfolioTab = {
  id: string;
  label: string;
  subsections: PortfolioSubsection[];
};

export type CaseStudy = {
  id: string;
  client: string;
  title: string;
  problem: string;
  process: string;
  solution: string;
  result: string;
  image: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

export type SiteContent = {
  portfolioTabs: PortfolioTab[];
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
};
