import { parsePortfolioHash as parsePortfolioHashWithTabs } from "@/lib/portfolio-hash";

export const SITE = {
  name: "The Kofi Ansah",
  title: "Photographer • Graphic Designer • Creative Developer • Videographer",
  tagline: "Let's create something timeless.",
  email: "theaduansah@gmail.com",
  phone: "+233270373565",
  location: "Accra, Ghana",
  instagram: "@thekofiansah",
  availability: "Freelance | Remote | Contract | Travel",
  logo: "/images/logo.png",
  social: {
    instagram: "https://instagram.com/thekofiansah",
    tiktok: "https://tiktok.com/@kofiansah",
    whatsapp: "https://wa.me/233270373565",
    email: "mailto:theaduansah@gmail.com",
  },
} as const;

export const BRANDS = [
  { name: "Porials Pitch", logo: "/images/brands/Porials-pitch.png" },
  { name: "Indomie", logo: "/images/brands/indomie.png" },
  { name: "GhanaMade", logo: "/images/brands/GhanaMade.png" },
  { name: "Kivo", logo: "/images/brands/kivo.png" },
  { name: "Stanbic Bank", logo: "/images/brands/stanbic-bank.png" },
  { name: "Coaches Lounge", logo: "/images/brands/coaches-lounge.png" },
  { name: "Enterprise Life", logo: "/images/brands/enterprise-life.png", rev: 2 },
  { name: "Heyome", logo: "/images/brands/heyome.png" },
] as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#projects" },
  { label: "Stories", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
] as const;

export const ABOUT = {
  bio: "I'm a multidisciplinary creative crafting visual stories across photography, brand design, and digital experiences. From campaign photography for national brands to packaging systems and cinematic web products, I blend craft with strategy to build work that feels premium and performs.",
  portrait: "/images/MY PHOTO.PNG",
  tools: [
    { name: "Photoshop", level: 99, icon: "photoshop" as const },
    { name: "Lightroom", level: 90, icon: "lightroom" as const },
    { name: "After Effects", level: 72, icon: "aftereffects" as const },
    { name: "Premiere Pro", level: 72, icon: "premiere" as const },
    { name: "DaVinci Resolve", level: 72, icon: "davinci" as const },
    { name: "CapCut", level: 72, icon: "capcut" as const },
    { name: "VN", level: 72, icon: "vn" as const },
    { name: "VS Code", level: 72, icon: "vscode" as const },
    { name: "Next.js", level: 72, icon: "nextjs" as const },
  ],
} as const;

export const SERVICES = [
  {
    title: "Photography",
    description: "Campaign, product, and editorial photography with cinematic lighting.",
    icon: "camera",
    href: "#projects-photography-portraits",
  },
  {
    title: "Graphic Design",
    description: "Brand identity, packaging, and visual systems that command attention.",
    icon: "palette",
    href: "#projects-designs-branding",
  },
  {
    title: "Web Development",
    description: "Immersive, high-performance digital experiences built to convert.",
    icon: "code",
    href: "#projects-web-development-landing-pages",
  },
  {
    title: "Videography",
    description: "Cinematic brand films, commercials, and social content with premium storytelling.",
    icon: "video",
    href: "#projects-videography-commercials",
  },
] as const;

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

export const PORTFOLIO_TABS: PortfolioTab[] = [
  {
    id: "photography",
    label: "Photography",
    subsections: [
      {
        id: "portraits",
        label: "Portraits",
        images: [
          { title: "Studio Portrait I", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80" },
          { title: "Studio Portrait II", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=80" },
          { title: "Editorial Portrait", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80" },
        ],
      },
      {
        id: "events",
        label: "Events",
        images: [
          { title: "Corporate Gala", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80" },
          { title: "Live Concert", image: "https://images.unsplash.com/photo-1429962710118-6aafacf662ee?w=1200&q=80" },
          { title: "Brand Launch", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80" },
        ],
      },
      {
        id: "weddings",
        label: "Weddings",
        images: [
          { title: "Garden Ceremony", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80" },
          { title: "Reception Details", image: "https://images.unsplash.com/photo-1465496636074-511ea55c0991?w=1200&q=80" },
          { title: "Couple Portrait", image: "https://images.unsplash.com/photo-1522673606160-9516788f086a?w=1200&q=80" },
        ],
      },
    ],
  },
  {
    id: "designs",
    label: "Designs",
    subsections: [
      {
        id: "branding",
        label: "Branding",
        images: [
          { title: "GhanaMade Rebrand", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80" },
          { title: "Dicta Foods Identity", image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=80" },
          { title: "Flame On Visual System", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80" },
        ],
      },
      {
        id: "ui-ux",
        label: "UI/UX",
        images: [
          { title: "Heyome App UI", image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=1200&q=80" },
          { title: "Fintech Dashboard", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80" },
          { title: "Mobile Onboarding", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80" },
        ],
      },
      {
        id: "event-artworks",
        label: "Event Artworks",
        images: [
          { title: "Festival Poster", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80" },
          { title: "Concert Flyer Series", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80" },
          { title: "Exhibition Graphics", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1200&q=80" },
        ],
      },
      {
        id: "digital-arts",
        label: "Digital Arts",
        images: [
          { title: "Concept Illustration", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80" },
          { title: "Album Artwork", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80" },
          { title: "Social Campaign Visuals", image: "https://images.unsplash.com/photo-1561736778-92e52f785251?w=1200&q=80" },
        ],
      },
    ],
  },
  {
    id: "web-development",
    label: "Web Development",
    subsections: [
      {
        id: "landing-pages",
        label: "Landing Pages",
        images: [
          { title: "Product Launch Page", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80" },
          { title: "SaaS Hero Landing", image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80" },
        ],
      },
      {
        id: "websites",
        label: "Websites",
        images: [
          { title: "Enterprise Portal", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80" },
          { title: "Creative Studio Site", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80" },
          { title: "Wedding Invitation", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80" },
        ],
      },
      {
        id: "systems",
        label: "Systems",
        images: [
          { title: "Admin Dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80" },
          { title: "Booking Platform", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80" },
        ],
      },
    ],
  },
  {
    id: "videography",
    label: "Videography",
    subsections: [
      {
        id: "commercials",
        label: "Commercials",
        images: [
          { title: "Brand Film", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80" },
          { title: "Product Spotlight", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80" },
          { title: "Campaign Reel", image: "https://images.unsplash.com/photo-1536240478700-b869070f8839?w=1200&q=80" },
        ],
      },
      {
        id: "social",
        label: "Social Content",
        images: [
          { title: "Instagram Reels", image: "https://images.unsplash.com/photo-1611162616475-46b635cb6848?w=1200&q=80" },
          { title: "TikTok Series", image: "https://images.unsplash.com/photo-1611162616305-c69b3037c7bb?w=1200&q=80" },
        ],
      },
      {
        id: "events",
        label: "Event Films",
        images: [
          { title: "Corporate Gala", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80" },
          { title: "Live Concert", image: "https://images.unsplash.com/photo-1429962710118-6aafacf662ee?w=1200&q=80" },
        ],
      },
    ],
  },
];

export function parsePortfolioHash(hash: string) {
  return parsePortfolioHashWithTabs(hash, PORTFOLIO_TABS);
}

export const CASE_STUDIES = [
  {
    client: "Flame On",
    title: "Igniting a bold visual identity",
    problem:
      "Flame On needed a campaign that felt energetic and premium while standing out in a crowded FMCG market.",
    process:
      "Directed photography, built a modular design system, and crafted motion assets for social and OOH.",
    solution:
      "A cohesive rollout across digital, print, and in-store touchpoints with unified art direction.",
    result: "+40% engagement across channels with a 3-week turnaround.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
  },
  {
    client: "Heyome",
    title: "Designing a digital home experience",
    problem:
      "Heyome required an intuitive app interface balancing warmth with modern utility.",
    process:
      "User flows, high-fidelity UI in Figma, component library, and motion specs for development.",
    solution:
      "A polished product experience with improved onboarding and stronger brand trust.",
    result: "+28% onboarding completion with a scalable UI system.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1400&q=80",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Kofi translated our vision into visuals that felt cinematic and unmistakably ours. Exceptional attention to detail.",
    name: "Ama Serwaa",
    role: "Marketing Director, GhanaMade",
  },
  {
    quote:
      "From photography to the final website, every point felt premium. Our launch exceeded expectations.",
    name: "Daniel Mensah",
    role: "Founder, Heyome",
  },
  {
    quote:
      "Reliable, creative, and fast. Kofi delivered a brand system we still use across all channels today.",
    name: "Esi Owusu",
    role: "Brand Lead, Dicta Foods",
  },
] as const;

export const HERO_COLLAGE = [
  "/images/hero/01.jpg",
  "/images/hero/02.jpeg",
  "/images/hero/03.jpg",
  "/images/hero/04.jpg",
  "/images/hero/05.jpg",
  "/images/hero/06.jpg",
] as const;
