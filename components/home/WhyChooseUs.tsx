"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  "Experienced healthcare instructors with real-world clinical backgrounds",
  "Live, interactive online instruction — not pre-recorded videos",
  "Comprehensive curriculum covering all essential cardiac monitoring topics",
  "Accessible for beginners with no prior medical experience required",
  "California Board of Registered Nursing approved for continuing education",
  "Dedicated support throughout your learning journey",
];

const stats = [
  { number: "500+", label: "Students Certified" },
  { number: "98%", label: "Pass Rate" },
  { number: "32", label: "Contact Hours" },
  { number: "4", label: "Day Intensive" },
];

export function WhyChooseUs() {
  return (
    <Section variant="light">
      <SectionHeading
        title="Why Choose Pulse Medication"
        subtitle="We provide hands-on, expert-led training that prepares you for real healthcare environments."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ul className="space-y-4">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{reason}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100"
            >
              <p className="text-3xl font-bold font-heading text-navy-700">
                {stat.number}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
