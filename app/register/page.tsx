import type { Metadata } from "next";
import { RegistrationForm } from "@/components/register/RegistrationForm";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Register — Join Now",
  description:
    "Register for the EKG Monitor Tech Certification course. Complete the form to begin your healthcare career.",
};

export default function RegisterPage() {
  return (
    <Section className="pt-8 sm:pt-28">
      <SectionHeading
        eyebrow="Enrollment"
        title="Register for the Course"
        subtitle="Complete the form below to enroll in our EKG Monitor Tech Certification program."
      />
      <RegistrationForm />
    </Section>
  );
}
