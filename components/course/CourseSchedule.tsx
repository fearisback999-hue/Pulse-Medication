"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COURSE_SCHEDULE } from "@/lib/constants/course";

export function CourseSchedule() {
  return (
    <Section variant="light">
      <SectionHeading
        eyebrow="Schedule"
        title="4 Days of Structured Learning"
        subtitle="Each day covers focused topics to build your cardiac monitoring expertise progressively."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
        {COURSE_SCHEDULE.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-card border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-navy-700 text-white font-bold text-sm font-heading">
                {index + 1}
              </span>
              <div>
                <p className="text-gold-600 font-medium text-xs tracking-wide uppercase">
                  {day.day}
                </p>
                <h3 className="text-lg font-bold font-heading text-navy-800 tracking-tight">
                  {day.title}
                </h3>
              </div>
            </div>
            <ul className="space-y-2.5">
              {day.topics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-2.5 text-gray-500 text-sm"
                >
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-[7px] flex-shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
