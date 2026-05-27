"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

export function LifelongLearning() {
  return (
    <Section className="pt-8 sm:pt-28">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0.7, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-gold-600 font-semibold text-sm tracking-wide uppercase mb-3">
            About Pulse Medication
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-navy-800 tracking-tightest text-balance">
            We Believe in{" "}
            <span className="text-gold-500">Lifelong Learning</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.7, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-6 text-gray-600 text-lg leading-relaxed"
        >
          <p>
            Welcome to Pulse Medication, an institution providing healthcare
            training programs designed to help students grow professionally and
            confidently in the healthcare field. Our mission is to provide
            high-quality educational support and practical healthcare knowledge
            through accessible online learning.
          </p>
          <p>
            We are experienced in working with students from all academic and
            professional backgrounds and helping them achieve their career goals.
            Our programs are designed for individuals who want to strengthen their
            knowledge, advance professionally, and build confidence in patient care
            and cardiac monitoring.
          </p>
          <p>
            We wish you success in your educational journey and future healthcare
            career.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
