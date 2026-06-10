import Navbar from "@/components/landing/Navbar";
import ScrollToTop from "@/components/landing/ScrollToTop";
import Footer from "@/components/landing/Footer";

import Hero from "@/sections/Hero";
import RunningText from "@/sections/RunningText";
import AboutUs from "@/sections/AboutUs";
import Features from "@/sections/Features";
import HowItWorks from "@/sections/HowItWorks";
import AIShowcase from "@/sections/AIShowcase";
import Impact from "@/sections/Impact";
import WhyUs from "@/sections/WhyUs";
import Pricing from "@/sections/Pricing";
import Solutions from "@/sections/Solutions";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import CTA from "@/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <RunningText />      <AboutUs />
      <Features />
      <HowItWorks />
      <AIShowcase />
      <Impact />
      <WhyUs />
      <Pricing />
      <Solutions />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <ScrollToTop />
    </>
  );
}