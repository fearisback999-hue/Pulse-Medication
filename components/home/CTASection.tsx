"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants/site";

export function CTASection() {
  return (
    <section className="gradient-navy py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gold-400/80 font-semibold text-sm tracking-wide uppercase mb-4">
            Next Cohort Starting June 2026
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tightest mb-4 text-balance">
            Ready to Start Your Career in{" "}
            <span className="text-gold-400">Cardiac Monitoring?</span>
          </h2>
          <p className="text-gray-300/80 text-lg mb-4 max-w-2xl mx-auto">
            Join hundreds of graduates who have launched healthcare careers
            through our certification program.
          </p>
          <p className="text-3xl font-extrabold font-heading text-white mb-8">
            {SITE_CONFIG.coursePriceDisplay}
            <span className="text-gray-400 text-base font-normal ml-2">
              complete certification
            </span>
          </p>
          <Button href="/register" variant="secondary" size="lg">
            Enroll Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-10 pt-8 border-t border-white/[0.06]">
            {[
              { icon: ShieldCheck, label: "BRN Approved" },
              { icon: Award, label: "Certificate Included" },
              { icon: Users, label: "Beginner Friendly" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-gray-400/70 text-sm"
              >
                <item.icon className="h-4 w-4 text-gold-500/60" />
                {item.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
