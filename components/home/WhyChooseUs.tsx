"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

const EASE_OUT_EXPO = [0.23, 1, 0.32, 1] as const;

const reasons = [
  "Experienced healthcare instructors with real clinical backgrounds",
  "Live, interactive Zoom instruction — never pre-recorded",
  "Comprehensive curriculum covering all essential monitoring topics",
  "Accessible for beginners with no prior medical experience",
  "California Board of Registered Nursing approved (CE hours)",
  "Dedicated student support throughout your learning journey",
];

const stats = [
  { value: "500+", label: "Students Certified", sublabel: "Since 2023", accent: true },
  { value: "98%", label: "First-Attempt Pass Rate", sublabel: "Across all cohorts", accent: false },
  { value: "32", label: "CE Contact Hours", sublabel: "BRN approved", accent: false },
  { value: "4.9", label: "Student Rating", sublabel: "Out of 5.0", accent: false },
];

export function WhyChooseUs() {
  return (
    <Section variant="light" className="relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-navy-50/50 to-transparent pointer-events-none" />
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(16px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          <p className="text-gold-600 font-semibold text-sm tracking-wide uppercase mb-3">
            Why Pulse Medication
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-800 tracking-tightest mb-6">
            Training That Prepares You{" "}
            <span className="text-gold-500">for the Real World</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-[60ch]">
            Our program is built by healthcare professionals who understand
            what it takes to succeed in cardiac monitoring roles. Every hour
            of instruction is designed to build practical, job-ready skills.
          </p>

          <ul className="space-y-4 mb-8">
            {reasons.map((reason, i) => (
              <motion.li
                key={reason}
                initial={{ opacity: 0, transform: "translateX(-8px)" }}
                whileInView={{ opacity: 1, transform: "translateX(0px)" }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 + i * 0.05,
                  duration: 0.4,
                  ease: EASE_OUT_EXPO,
                }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-gray-700 text-[15px]">{reason}</span>
              </motion.li>
            ))}
          </ul>

          <Button href="/register" variant="primary" size="md">
            Start Your Enrollment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, transform: "translateY(12px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              viewport={{ once: true }}
              transition={{
                delay: 0.15 + index * 0.07,
                duration: 0.45,
                ease: EASE_OUT_EXPO,
              }}
              className={`relative rounded-2xl p-6 transition-[transform,box-shadow] duration-200 ease-out-expo hover:scale-[1.02] ${
                stat.accent
                  ? "bg-navy-700 text-white shadow-glow-navy"
                  : "bg-white border border-gray-100 shadow-card hover:shadow-card-hover"
              }`}
            >
              {stat.accent && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gold-400 breathe" />
              )}
              <p
                className={`text-3xl sm:text-4xl font-extrabold font-heading tracking-tightest ${
                  stat.accent ? "text-gold-400" : "text-navy-800"
                }`}
              >
                {stat.value}
              </p>
              <p
                className={`text-sm font-medium mt-1 ${
                  stat.accent ? "text-white/80" : "text-gray-700"
                }`}
              >
                {stat.label}
              </p>
              <p
                className={`text-xs mt-0.5 ${
                  stat.accent ? "text-white/50" : "text-gray-400"
                }`}
              >
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
