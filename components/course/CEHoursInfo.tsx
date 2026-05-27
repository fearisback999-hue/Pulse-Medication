"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, BookOpen } from "lucide-react";

export function CEHoursInfo() {
  return (
    <section className="gradient-navy py-14 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-50" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10"
        >
          {[
            {
              icon: ShieldCheck,
              title: "CA BRN Approved",
              description:
                "Provider approved by the California Board of Registered Nursing.",
            },
            {
              icon: Award,
              title: "32 CE Contact Hours",
              description:
                "Earn continuing education credits applicable to your professional development.",
            },
            {
              icon: BookOpen,
              title: "Materials Included",
              description:
                "All course materials provided electronically via email in PDF format.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.06] mb-4">
                <item.icon className="h-6 w-6 text-gold-400" />
              </div>
              <h3 className="text-white font-bold font-heading text-lg tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400/80 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
