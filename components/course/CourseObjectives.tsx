"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COURSE_OBJECTIVES } from "@/lib/constants/objectives";

export function CourseObjectives() {
  return (
    <Section>
      <SectionHeading
        title="Course Objectives"
        subtitle="At the conclusion of the class, the participant will be able to:"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto">
        {COURSE_OBJECTIVES.map((objective, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="flex items-start gap-3 bg-navy-50 rounded-lg p-4 border border-navy-100"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-navy-700 text-white text-xs font-bold flex-shrink-0">
              {index + 1}
            </span>
            <p className="text-gray-700 text-sm leading-relaxed">
              {objective}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
