"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PulseBeams } from "@/components/ui/pulse-beams";
import { SITE_CONFIG } from "@/lib/constants/site";
import { enrollBeams, enrollGradientColors } from "@/lib/constants/pulse-beams-config";

const EASE_OUT_EXPO = [0.23, 1, 0.32, 1] as const;

const trustItems = [
  { icon: ShieldCheck, label: "BRN Approved" },
  { icon: Award, label: "Certificate Included" },
  { icon: Users, label: "Beginner Friendly" },
];

export function CTASection() {
  return (
    <PulseBeams
      beams={enrollBeams}
      gradientColors={enrollGradientColors}
      baseColor="rgba(201,168,76,0.12)"
      accentColor="rgba(201,168,76,0.25)"
      className="gradient-navy py-16 sm:py-24"
      background={
        <>
          <div className="absolute inset-0 pattern-grid opacity-50" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/[0.04] rounded-full blur-3xl pointer-events-none pulse-slow" />
        </>
      }
    >
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0.5, transform: "translateY(10px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold-400 breathe" />
            <p className="text-gold-400/80 font-semibold text-sm tracking-wide uppercase">
              Next Cohort Starting June 2026
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tightest mb-4 text-balance">
            Ready to Start Your Career in{" "}
            <span className="text-gold-400">Cardiac Monitoring?</span>
          </h2>
          <p className="text-gray-300/80 text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of graduates who have launched healthcare careers
            through our certification program.
          </p>
          <p className="text-3xl font-extrabold font-heading text-white mb-8">
            {SITE_CONFIG.coursePriceDisplay}
            <span className="text-gray-400 text-base font-normal ml-2">
              complete certification
            </span>
          </p>

          <motion.div
            initial={{ opacity: 0.5, transform: "translateY(6px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: 0.15, duration: 0.4, ease: EASE_OUT_EXPO }}
          >
            <Button href="/register" variant="secondary" size="lg">
              Enroll Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-10 pt-8 border-t border-white/[0.06]">
            {trustItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0.5, transform: "translateY(4px)" }}
                whileInView={{ opacity: 1, transform: "translateY(0px)" }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  delay: 0.3 + i * 0.06,
                  duration: 0.35,
                  ease: EASE_OUT_EXPO,
                }}
                className="flex items-center gap-2 text-gray-400/70 text-sm"
              >
                <item.icon className="h-4 w-4 text-gold-500/60" strokeWidth={1.5} />
                {item.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PulseBeams>
  );
}
