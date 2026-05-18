"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COURSE_SCHEDULE } from "@/lib/constants/course";

export function CourseSchedule() {
  return (
    <Section variant="light">
      <SectionHeading
        title="Course Schedule"
        subtitle="4 days of intensive, structured learning covering all essential cardiac monitoring topics."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {COURSE_SCHEDULE.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-navy-700 text-white font-bold text-sm">
                {index + 1}
              </span>
              <div>
                <p className="text-xs text-gold-600 font-medium">{day.day}</p>
                <h3 className="text-lg font-bold font-heading text-navy-800">
                  {day.title}
                </h3>
              </div>
            </div>
            <ul className="space-y-2">
              {day.topics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-2 text-gray-600 text-sm"
                >
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 flex-shrink-0" />
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
