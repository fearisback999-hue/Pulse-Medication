import { Hero } from "@/components/home/Hero";
import { FeatureCards } from "@/components/home/FeatureCards";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { PricingSection } from "@/components/ui/squishy-pricing";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <WhyChooseUs />
      <PricingSection />
      <Testimonials />
      <CTASection />
    </>
  );
}
