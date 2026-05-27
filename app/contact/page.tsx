import type { Metadata } from "next";
import { ContactInfo } from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Pulse Medication for questions about our Monitor Tech Certification course.",
};

export default function ContactPage() {
  return <ContactInfo />;
}
