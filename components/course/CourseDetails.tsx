"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PulseBeams } from "@/components/ui/pulse-beams";
import { COURSE_INFO, COURSE_FEATURES } from "@/lib/constants/course";
import { SITE_CONFIG } from "@/lib/constants/site";
import { enrollBeams, enrollGradientColors } from "@/lib/constants/pulse-beams-config";
import { CheckCircle, ArrowRight } from "lucide-react";

export function CourseDetails() {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
        <motion.div
          initial={{ y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-6"
        >
          <div>
            <p className="text-gold-600 font-semibold text-sm tracking-wide uppercase mb-3">
              Course Overview
            </p>
            <h2 className="text-3xl font-extrabold font-heading text-navy-800 tracking-tightest">
              Course Introduction
            </h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            {COURSE_INFO.description}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {COURSE_INFO.fullDescription}
          </p>

          <div className="pt-4">
            <h3 className="text-lg font-bold font-heading text-navy-800 tracking-tight mb-4">
              Key Features
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COURSE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <CheckCircle className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-[15px]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <PulseBeams
            beams={enrollBeams}
            gradientColors={enrollGradientColors}
            baseColor="rgba(201,168,76,0.06)"
            accentColor="rgba(201,168,76,0.15)"
            className="rounded-2xl shadow-card-hover border border-gray-100 lg:sticky lg:top-24 bg-white"
          >
            <div className="p-6 sm:p-8">
              <h3 className="text-lg font-bold font-heading text-navy-800 tracking-tight mb-6">
                Course Details
              </h3>
              <div className="space-y-0">
                {[
                  { label: "Format", value: COURSE_INFO.format },
                  { label: "Duration", value: COURSE_INFO.duration },
                  { label: "Hours", value: COURSE_INFO.hours },
                  { label: "Schedule", value: COURSE_INFO.schedule },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between py-3.5 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-gray-400 text-sm">{row.label}</span>
                    <span className="font-medium text-navy-800 text-sm">
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-baseline pt-4 pb-2">
                  <span className="text-gray-400 text-sm">Price</span>
                  <span className="font-extrabold text-2xl text-navy-800 font-heading tracking-tightest">
                    {SITE_CONFIG.coursePriceDisplay}
                  </span>
                </div>
              </div>
              <Button
                href="/register"
                variant="secondary"
                className="w-full mt-6"
              >
                Enroll Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-gray-400 text-xs text-center mt-3">
                Materials provided electronically
              </p>
            </div>
          </PulseBeams>
        </motion.div>
      </div>
    </Section>
  );
}
