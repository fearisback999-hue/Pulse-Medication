"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants/site";

export function CTASection() {
  return (
    <section className="gradient-navy py-12 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 pattern-medical opacity-50" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white mb-4">
            Ready to Start Your Healthcare Career?
          </h2>
          <p className="text-gray-300 text-lg mb-3">
            Enroll in our EKG Monitor Tech Certification program today.
          </p>
          <p className="text-gold-400 text-2xl font-bold font-heading mb-8">
            {SITE_CONFIG.coursePriceDisplay} — Complete Certification
          </p>
          <Button href="/register" variant="secondary" size="lg">
            Enroll Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
