"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COURSE_OBJECTIVES, ARRHYTHMIA_GROUPS } from "@/lib/constants/objectives";

export function CourseObjectives() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Learning Outcomes"
        title="Course Objectives"
        subtitle="At the conclusion of the class, the participant will be able to:"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto mb-16">
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

      {/* Arrhythmias covered */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-gold-600 font-semibold text-sm tracking-wide uppercase mb-2">
            Rhythm Strip Identification
          </p>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-navy-800 tracking-tightest">
            Arrhythmias You Will Learn to Identify
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ARRHYTHMIA_GROUPS.map((group, gIdx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0.5, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: gIdx * 0.05, duration: 0.35 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-card p-6"
            >
              <h4 className="text-lg font-bold font-heading text-navy-800 tracking-tight mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
