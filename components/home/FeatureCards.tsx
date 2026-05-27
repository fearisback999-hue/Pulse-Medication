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

const EASE_OUT_EXPO = [0.23, 1, 0.32, 1] as const;

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Video,
    title: "Live Zoom Instruction",
    description:
      "Real-time classes with experienced healthcare educators. Ask questions, get feedback, and learn collaboratively.",
  },
  {
    icon: Clock,
    title: "32 Contact Hours",
    description:
      "Four intensive days of focused, structured training that covers everything you need for cardiac monitoring roles.",
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

function FeatureItem({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0.5, transform: "translateY(10px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: EASE_OUT_EXPO }}
      className={`group flex flex-col sm:flex-row items-start gap-5 sm:gap-6 ${
        isEven ? "" : "sm:flex-row-reverse sm:text-right"
      }`}
    >
      <div className="relative flex-shrink-0">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-navy-700 shadow-glass transition-[transform,box-shadow] duration-200 ease-out-expo group-hover:shadow-glow-gold group-hover:scale-105">
          <feature.icon className="h-5 w-5 text-gold-400" strokeWidth={1.5} />
        </div>
        <div className="absolute -inset-1 rounded-2xl bg-gold-500/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out-expo -z-10" />
      </div>
      <div>
        <h3 className="text-lg font-bold font-heading text-navy-800 mb-1.5">
          {feature.title}
        </h3>
        <p className="text-gray-500 text-[15px] leading-relaxed max-w-[50ch]">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export function FeatureCards() {
  return (
    <Section className="relative">
      <div className="absolute inset-0 pattern-dots pointer-events-none" />
      <div className="relative">
        <motion.div
          initial={{ opacity: 0.5, transform: "translateY(10px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="mb-14 sm:mb-20"
        >
          <p className="text-gold-600 font-semibold text-sm tracking-wide uppercase mb-3">
            Program Highlights
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-800 tracking-tightest text-balance max-w-lg">
            Everything You Need to Succeed
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-16 md:gap-y-12 max-w-5xl">
          {features.map((feature, index) => (
            <FeatureItem key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
