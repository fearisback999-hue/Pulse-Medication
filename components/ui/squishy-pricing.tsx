"use client";

import { motion } from "framer-motion";
import { PulseBeams } from "@/components/ui/pulse-beams";
import { enrollBeams, enrollGradientColors } from "@/lib/constants/pulse-beams-config";

const EASE_OUT_EXPO = [0.23, 1, 0.32, 1] as const;

const features = [
  "4-day live online program",
  "32 contact hours",
  "Live Q&A sessions",
  "Certificate of completion",
  "Priority email support",
  "1 year material access",
];

export const PricingSection = () => {
  return (
    <PulseBeams
      beams={enrollBeams}
      gradientColors={enrollGradientColors}
      baseColor="rgba(201,168,76,0.08)"
      accentColor="rgba(201,168,76,0.18)"
      className="bg-white px-4 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0.5, transform: "translateY(10px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="text-center mb-16"
        >
          <p className="text-gold-600 font-semibold text-sm tracking-wide uppercase mb-3">
            Program Investment
          </p>
          <h2 className="text-4xl font-extrabold font-heading text-navy-800 tracking-tightest mb-4">
            Complete Certification Package
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to become a certified EKG Monitor Tech in one all-inclusive program.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.5, transform: "translateY(10px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="relative overflow-hidden rounded-2xl p-8 sm:p-10 bg-navy-700 shadow-card-elevated"
        >
          <div className="relative z-10 text-white">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <span className="inline-block rounded-full bg-gold-500/20 px-4 py-1 text-sm font-semibold text-gold-300 border border-gold-500/30 mb-4">
                  All-Inclusive
                </span>
                <div>
                  <span className="font-mono text-5xl sm:text-6xl font-black leading-tight">
                    $950
                  </span>
                  <span className="text-sm text-white/70 ml-2">one-time investment</span>
                </div>
              </div>
              <a
                href="/register"
                className="inline-block rounded-xl border-2 border-white bg-white px-8 py-3 text-center font-semibold uppercase text-navy-800 transition-[transform,box-shadow] duration-150 ease-out-expo hover:shadow-card-elevated active:scale-[0.97] active:duration-100 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Enroll Now
              </a>
            </div>

            <p className="text-base text-white/85 mb-8 leading-relaxed max-w-[55ch]">
              Comprehensive training with direct instructor access, priority support, and everything you need to pass on your first attempt.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-white/85">
                  <svg
                    className="w-4 h-4 text-gold-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PulseBeams>
  );
};
