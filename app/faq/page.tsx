import type { Metadata } from "next";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about our EKG Monitor Tech Certification course, schedule, pricing, and enrollment.",
};

export default function FAQPage() {
  return (
    <Section className="pt-28">
      <SectionHeading
        title="Frequently Asked Questions"
        subtitle="Find answers to the most common questions about our Monitor Tech Certification program."
      />
      <FAQAccordion />
    </Section>
  );
}
