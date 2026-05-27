"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COURSE_OBJECTIVES } from "@/lib/constants/objectives";

export function CourseObjectives() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Learning Outcomes"
        title="Course Objectives"
        subtitle="At the conclusion of the class, the participant will be able to:"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto">
        {COURSE_OBJECTIVES.map((objective, index) => (
          <motion.div
            key={index}
            initial={{ y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
            className="flex items-start gap-3 bg-gray-50/70 rounded-xl p-4 border border-gray-100"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-navy-700 text-white text-xs font-bold flex-shrink-0 font-heading">
              {index + 1}
            </span>
            <p className="text-gray-600 text-sm leading-relaxed">
              {objective}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
