"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { COURSE_INFO, COURSE_FEATURES } from "@/lib/constants/course";
import { SITE_CONFIG } from "@/lib/constants/site";
import { CheckCircle, ArrowRight } from "lucide-react";

export function CourseDetails() {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-6"
        >
          <h2 className="text-3xl font-bold font-heading text-navy-800">
            Course Introduction
          </h2>
          <div className="w-16 h-1 bg-gold-500 rounded-full" />
          <p className="text-gray-700 leading-relaxed">
            {COURSE_INFO.description}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {COURSE_INFO.fullDescription}
          </p>

          <h3 className="text-xl font-bold font-heading text-navy-800 mt-8">
            Key Features
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COURSE_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 sticky top-28">
            <h3 className="text-xl font-bold font-heading text-navy-800 mb-6">
              Course Details
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Format</span>
                <span className="font-medium text-navy-800 text-sm">
                  {COURSE_INFO.format}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Duration</span>
                <span className="font-medium text-navy-800 text-sm">
                  {COURSE_INFO.duration}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Hours</span>
                <span className="font-medium text-navy-800 text-sm">
                  {COURSE_INFO.hours}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Schedule</span>
                <span className="font-medium text-navy-800 text-sm">
                  {COURSE_INFO.schedule}
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-500 text-sm">Price</span>
                <span className="font-bold text-2xl text-navy-800">
                  {SITE_CONFIG.coursePriceDisplay}
                </span>
              </div>
            </div>
            <Button href="/register" variant="secondary" className="w-full">
              Enroll Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-gray-400 text-xs text-center mt-3">
              Materials provided electronically
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
