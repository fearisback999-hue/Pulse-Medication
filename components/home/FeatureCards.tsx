"use client";

import { motion } from "framer-motion";
import {
  Video,
  Clock,
  Award,
  Users,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import type { LucideIcon } from "lucide-react";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Video,
    title: "Live Zoom Instruction",
    description:
      "Real-time classes with experienced healthcare educators. Ask questions, get feedback, and learn collaboratively — not from pre-recorded videos.",
  },
  {
    icon: Clock,
    title: "32 Contact Hours",
    description:
      "Four intensive days of focused, structured training that covers everything you need to know for cardiac monitoring roles.",
  },
  {
    icon: Award,
    title: "Certification Included",
    description:
      "Receive your official Monitor Tech Certification upon successful completion, ready to present to employers.",
  },
  {
    icon: Users,
    title: "No Experience Needed",
    description:
      "Designed for career changers and beginners. We start with the fundamentals and build your competence from the ground up.",
  },
  {
    icon: ShieldCheck,
    title: "CA BRN Approved",
    description:
      "Approved by the California Board of Registered Nursing for continuing education credit hours.",
  },
  {
    icon: Calendar,
    title: "Flexible Online Format",
    description:
      "Attend from anywhere with an internet connection. All course materials delivered electronically in PDF format.",
  },
];

export function FeatureCards() {
  return (
    <Section className="relative">
      <div className="absolute inset-0 pattern-dots pointer-events-none" />
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-gold-600 font-semibold text-sm tracking-wide uppercase mb-3">
            Program Highlights
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-800 tracking-tightest text-balance">
            Everything You Need to Succeed
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-card hover:shadow-card-hover hover:border-gray-200 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-navy-700 mb-5">
                <feature.icon className="h-5 w-5 text-gold-400" />
              </div>
              <h3 className="text-lg font-bold font-heading text-navy-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
