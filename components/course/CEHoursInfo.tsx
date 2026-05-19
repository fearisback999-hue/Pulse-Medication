"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, BookOpen } from "lucide-react";

export function CEHoursInfo() {
  return (
    <section className="gradient-navy py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center"
        >
          <div>
            <ShieldCheck className="h-10 w-10 text-gold-400 mx-auto mb-3" />
            <h3 className="text-white font-bold font-heading text-lg mb-2">
              CA BRN Approved
            </h3>
            <p className="text-gray-400 text-sm">
              Provider approved by the California Board of Registered Nursing.
            </p>
          </div>
          <div>
            <Award className="h-10 w-10 text-gold-400 mx-auto mb-3" />
            <h3 className="text-white font-bold font-heading text-lg mb-2">
              32 CE Contact Hours
            </h3>
            <p className="text-gray-400 text-sm">
              Earn continuing education credits applicable to your professional
              development.
            </p>
          </div>
          <div>
            <BookOpen className="h-10 w-10 text-gold-400 mx-auto mb-3" />
            <h3 className="text-white font-bold font-heading text-lg mb-2">
              Course Materials Included
            </h3>
            <p className="text-gray-400 text-sm">
              All materials provided electronically via email in PDF format.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
