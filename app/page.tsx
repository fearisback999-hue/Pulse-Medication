import { Hero } from "@/components/home/Hero";
import { FeatureCards } from "@/components/home/FeatureCards";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </>
  );
}
