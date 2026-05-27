import { About } from "@/components/portfolio/About";
import { BrandsShowcase } from "@/components/portfolio/BrandsShowcase";
import { CaseStudies } from "@/components/portfolio/CaseStudies";
import { Contact } from "@/components/portfolio/Contact";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { Footer } from "@/components/portfolio/Footer";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { Services } from "@/components/portfolio/Services";
import { Testimonials } from "@/components/portfolio/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandsShowcase />
        <About />
        <Services />
        <FeaturedProjects />
        <CaseStudies />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
