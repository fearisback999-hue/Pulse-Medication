"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center gradient-navy pattern-medical overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-950/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-2 mb-6"
          >
            <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
            <span className="text-gold-400 text-sm font-medium">
              CA BRN Approved — 32 Contact Hours
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight mb-4 sm:mb-6"
          >
            Monitor Tech{" "}
            <span className="text-gold-400">Certification Program</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-10 leading-relaxed"
          >
            Live Online EKG Monitor Technician Training Designed For Healthcare
            Professionals And Beginners.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button href="/register" variant="secondary" size="lg">
              Enroll Now
            </Button>
            <Button href="/course" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              View Course Details
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-wrap gap-3 sm:gap-6 mt-8 sm:mt-12 text-xs sm:text-sm text-gray-400"
          >
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
              Live Online via Zoom
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
              4-Day Intensive
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
              Certificate Included
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
              Beginner Friendly
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
