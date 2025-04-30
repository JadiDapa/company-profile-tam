import About from "@/components/root/Home/About";
import CTA from "@/components/root/Home/CTA";
import FAQ from "@/components/root/Home/FAQ";
import Features from "@/components/root/Home/Features";
import Hero from "@/components/root/Home/Hero";
import Partners from "@/components/root/Home/Partners";
import Activities from "@/components/root/Home/Activities";
import Services from "@/components/root/Home/Services";
import Gallery from "@/components/root/Home/Gallery";

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <About />
      <Services />
      <Features />
      <Activities />
      <Gallery />
      <FAQ />
      <CTA />
    </>
  );
}
