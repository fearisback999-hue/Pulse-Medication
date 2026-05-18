"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

export function LifelongLearning() {
  return (
    <Section className="pt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-navy-800 mb-6">
          We Believe in{" "}
          <span className="text-gold-500">Lifelong Learning</span>
        </h1>
        <div className="w-16 h-1 bg-gold-500 rounded-full mx-auto mb-8" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-3xl mx-auto space-y-6 text-gray-700 leading-relaxed"
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
    </Section>
  );
}
