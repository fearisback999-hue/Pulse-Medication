"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { SITE_CONFIG } from "@/lib/constants/site";

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone.replace(/\D/g, "")}`,
    action: "Call Us",
  },
  {
    icon: Mail,
    title: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    action: "Email Us",
  },
  {
    icon: MapPin,
    title: "Address",
    value: SITE_CONFIG.address.full,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.address.full)}`,
    action: "Get Directions",
  },
  {
    icon: Clock,
    title: "Office Hours",
    value: "Monday – Friday, 9:00 AM – 5:00 PM PST",
    href: undefined,
    action: undefined,
  },
];

export function ContactInfo() {
  return (
    <>
      <Section className="pt-8 sm:pt-28">
        <SectionHeading
          title="Contact Us"
          subtitle="Have questions about our EKG Monitor Tech Certification? We're here to help."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {contactCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-navy-50 mb-4">
                  <card.icon className="h-7 w-7 text-navy-700" />
                </div>
                <h3 className="text-lg font-bold font-heading text-navy-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-4">{card.value}</p>
                {card.href && (
                  <a
                    href={card.href}
                    target={card.title === "Address" ? "_blank" : undefined}
                    rel={card.title === "Address" ? "noopener noreferrer" : undefined}
                    className="text-gold-600 hover:text-gold-500 font-medium text-sm transition-colors"
                  >
                    {card.action} &rarr;
                  </a>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="light">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                title="Pulse Medication Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.8!2d-117.9114!3d33.8297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd7d2d7a3c0f1%3A0x0!2s1240+S+State+College+Blvd%2C+Anaheim%2C+CA+92806!5e0!3m2!1sen!2sus!4v1"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
