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
    <section className="gradient-navy pattern-medical py-24 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white mb-4">
            EKG Monitor Tech{" "}
            <span className="text-gold-400">Certification</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Comprehensive live online training in cardiac rhythm interpretation
            and telemetry monitoring.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
              >
                <badge.icon className="h-4 w-4 text-gold-400" />
                <span className="text-white text-sm font-medium">
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
