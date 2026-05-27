"use client";

import { motion } from "framer-motion";
import { Monitor, Clock, Calendar, Wifi } from "lucide-react";

export function CourseHero() {
  const badges = [
    { icon: Calendar, label: "4 Days" },
    { icon: Clock, label: "32 Hours" },
    { icon: Wifi, label: "Live Online" },
    { icon: Monitor, label: "Via Zoom" },
  ];

  return (
    <section className="gradient-navy py-20 pt-28 sm:py-28 sm:pt-36 relative overflow-hidden">
      <div className="absolute inset-0 pattern-grid" />
      <div className="absolute top-10 right-0 w-96 h-96 bg-gold-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-gold-400/80 font-semibold text-sm tracking-wide uppercase mb-4">
            Certification Program
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tightest mb-5">
            EKG Monitor Tech{" "}
            <span className="text-gold-400">Certification</span>
          </h1>
          <p className="text-gray-300/80 text-lg max-w-2xl mx-auto mb-10">
            Comprehensive live online training in cardiac rhythm interpretation
            and telemetry monitoring for healthcare professionals and beginners.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.3 }}
                className="flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-full px-4 py-2"
              >
                <badge.icon className="h-4 w-4 text-gold-400/80" />
                <span className="text-white/90 text-sm font-medium">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
