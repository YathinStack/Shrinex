import Hero from "@/components/Hero";
import FlipTextSection from "@/components/FlipTextSection";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import WhyWebsite from "@/components/WhyWebsite";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import PeekIntoWork from "@/components/PeekIntoWork";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <FlipTextSection />
      <Stats />
      <PeekIntoWork />
      <Services />
      <WhyWebsite />
      <Process />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
