"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlbHeart } from "@/components/ui/GlbHeart";
import { Card } from "@/components/ui/shadcn-card";
import { Spotlight } from "@/components/ui/spotlight";

const EASE_OUT_EXPO = [0.23, 1, 0.32, 1] as const;

function EKGLine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1200 200"
        className="absolute bottom-0 left-0 w-full h-32 sm:h-48 opacity-[0.06]"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 L200,100 L230,100 L240,40 L250,160 L260,60 L270,120 L280,90 L290,100 L500,100 L530,100 L540,40 L550,160 L560,60 L570,120 L580,90 L590,100 L800,100 L830,100 L840,40 L850,160 L860,60 L870,120 L880,90 L890,100 L1200,100"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="2.5"
          className="ekg-animate"
        />
      </svg>
    </div>
  );
}

function BeatingHeart() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Left heart */}
      <div className="absolute top-[15%] left-[8%]">
        <motion.div
          animate={{ scale: [1, 2.4], opacity: [0.12, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-gold-500/20"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gold-500/[0.04] rounded-full blur-3xl pulse-slow" />
        <motion.svg
          animate={{ scale: [1, 1.1, 1, 1.14, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: [0.23, 1, 0.32, 1], times: [0, 0.15, 0.3, 0.45, 0.7] }}
          viewBox="0 0 512 512"
          className="relative w-20 h-20 sm:w-28 sm:h-28"
          fill="none"
        >
          <defs>
            <linearGradient id="heart-bg-l" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AD4B" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path
            d="M256 448l-30.164-27.211C118.718 322.927 48 258.636 48 179.834 48 114.629 98.629 64 163.834 64c36.458 0 71.452 16.951 92.166 43.758C276.714 80.951 311.708 64 348.166 64 413.371 64 464 114.629 464 179.834c0 78.802-70.718 143.093-177.836 241.062L256 448z"
            fill="url(#heart-bg-l)"
            stroke="#C9A84C"
            strokeWidth="2"
            strokeOpacity="0.15"
          />
        </motion.svg>
      </div>

      {/* Right heart (larger) */}
      <div className="absolute bottom-[12%] right-[6%] hidden sm:block">
        <motion.div
          animate={{ scale: [1, 2.6], opacity: [0.1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-gold-400/15"
        />
        <motion.div
          animate={{ scale: [1, 2], opacity: [0.08, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-gold-500/10"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/[0.05] rounded-full blur-3xl pulse-slow" />
        <motion.svg
          animate={{ scale: [1, 1.08, 1, 1.12, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: [0.23, 1, 0.32, 1], times: [0, 0.15, 0.3, 0.45, 0.7], delay: 0.15 }}
          viewBox="0 0 512 512"
          className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44"
          fill="none"
        >
          <defs>
            <linearGradient id="heart-bg-r" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AD4B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#E0C372" stopOpacity="0.04" />
            </linearGradient>
            <filter id="heart-glow-r">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M256 448l-30.164-27.211C118.718 322.927 48 258.636 48 179.834 48 114.629 98.629 64 163.834 64c36.458 0 71.452 16.951 92.166 43.758C276.714 80.951 311.708 64 348.166 64 413.371 64 464 114.629 464 179.834c0 78.802-70.718 143.093-177.836 241.062L256 448z"
            fill="url(#heart-bg-r)"
            stroke="#C9A84C"
            strokeWidth="2.5"
            strokeOpacity="0.2"
            filter="url(#heart-glow-r)"
          />
        </motion.svg>
        {/* EKG through heart */}
        <svg
          viewBox="0 0 200 40"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[35%] w-48 sm:w-56 lg:w-64 opacity-[0.1]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 L50,20 L65,20 L72,6 L80,34 L88,10 L94,28 L100,17 L105,20 L150,20 L165,20 L172,6 L180,34 L188,10 L194,28 L200,20"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="1.5"
            className="ekg-animate"
          />
        </svg>
      </div>

      {/* Top-right small heart */}
      <div className="absolute top-[25%] right-[15%] hidden lg:block">
        <motion.svg
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: [0.23, 1, 0.32, 1], delay: 0.4 }}
          viewBox="0 0 512 512"
          className="w-12 h-12 opacity-[0.08]"
          fill="none"
        >
          <path
            d="M256 448l-30.164-27.211C118.718 322.927 48 258.636 48 179.834 48 114.629 98.629 64 163.834 64c36.458 0 71.452 16.951 92.166 43.758C276.714 80.951 311.708 64 348.166 64 413.371 64 464 114.629 464 179.834c0 78.802-70.718 143.093-177.836 241.062L256 448z"
            fill="#C9A84C"
            fillOpacity="0.3"
            stroke="#C9A84C"
            strokeWidth="3"
            strokeOpacity="0.15"
          />
        </motion.svg>
      </div>

      {/* Bottom-left small heart */}
      <div className="absolute bottom-[30%] left-[18%] hidden lg:block">
        <motion.svg
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: [0.23, 1, 0.32, 1], delay: 0.6 }}
          viewBox="0 0 512 512"
          className="w-10 h-10 opacity-[0.06]"
          fill="none"
        >
          <path
            d="M256 448l-30.164-27.211C118.718 322.927 48 258.636 48 179.834 48 114.629 98.629 64 163.834 64c36.458 0 71.452 16.951 92.166 43.758C276.714 80.951 311.708 64 348.166 64 413.371 64 464 114.629 464 179.834c0 78.802-70.718 143.093-177.836 241.062L256 448z"
            fill="#C9A84C"
            fillOpacity="0.25"
            stroke="#C9A84C"
            strokeWidth="3"
            strokeOpacity="0.12"
          />
        </motion.svg>
      </div>
    </div>
  );
}

const statItems = [
  { value: "4 Days", label: "Intensive Program" },
  { value: "32 Hours", label: "Contact Hours" },
  { value: "Live", label: "Zoom Instruction" },
  { value: "$950", label: "All-Inclusive" },
];

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center gradient-navy overflow-hidden pt-20">
      <div className="absolute inset-0 pattern-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/20 via-transparent to-navy-950/60" />
      <EKGLine />
      <BeatingHeart />

      <div className="absolute top-20 right-10 w-72 h-72 bg-gold-500/[0.03] rounded-full blur-3xl pulse-slow" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-navy-400/[0.06] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        <Card className="w-full border-white/[0.08] bg-black/[0.3] relative overflow-hidden rounded-2xl shadow-glass">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="flex flex-col lg:flex-row min-h-[760px] lg:min-h-[calc(100dvh-9rem)]">
            {/* Left: Text Content */}
            <div className="flex-1 lg:flex-[0.92] p-8 sm:p-12 lg:p-16 relative z-10 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, transform: "translateY(16px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                className="inline-flex items-center gap-2.5 bg-white/[0.06] glass-panel rounded-full px-4 py-2 mb-8 w-fit"
              >
                <ShieldCheck className="h-4 w-4 text-gold-400" />
                <span className="text-gold-300/90 text-sm font-medium tracking-wide">
                  California BRN Approved Provider
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, transform: "translateY(20px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ delay: 0.1, duration: 0.6, ease: EASE_OUT_EXPO }}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold font-heading text-white leading-[1.08] tracking-tightest mb-6"
              >
                Become a Certified{" "}
                <span className="relative">
                  <span className="text-gold-400">EKG Monitor Tech</span>
                  <motion.span
                    initial={{ transform: "scaleX(0)" }}
                    animate={{ transform: "scaleX(1)" }}
                    transition={{ delay: 0.7, duration: 0.5, ease: EASE_OUT_EXPO }}
                    className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gold-500/40 rounded-full origin-left"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, transform: "translateY(16px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ delay: 0.2, duration: 0.5, ease: EASE_OUT_EXPO }}
                className="text-lg sm:text-xl text-gray-300/90 mb-10 leading-relaxed max-w-[50ch]"
              >
                4-day live online certification program. 32 contact hours of
                expert-led cardiac rhythm interpretation training, no prior
                healthcare experience required.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, transform: "translateY(16px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ delay: 0.3, duration: 0.5, ease: EASE_OUT_EXPO }}
                className="flex flex-col sm:flex-row gap-4 mb-14"
              >
                <Button href="/register" variant="secondary" size="lg">
                  Start Your Enrollment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  href="/course"
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/[0.06] hover:text-white hover:border-white/30"
                >
                  Explore the Curriculum
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, transform: "translateY(12px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ delay: 0.5, duration: 0.6, ease: EASE_OUT_EXPO }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/[0.06]"
              >
                {statItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, transform: "translateY(8px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{
                      delay: 0.6 + i * 0.06,
                      duration: 0.4,
                      ease: EASE_OUT_EXPO,
                    }}
                  >
                    <p className="text-white font-bold font-heading text-xl sm:text-2xl">
                      {item.value}
                    </p>
                    <p className="text-gray-400/80 text-sm mt-0.5">{item.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: 3D Heart Scene */}
            <motion.div
              initial={{ opacity: 0, transform: "scale(0.96)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              transition={{ delay: 0.2, duration: 0.8, ease: EASE_OUT_EXPO }}
              className="flex-1 lg:flex-[1.35] relative min-h-[560px] lg:min-h-0 overflow-visible lg:min-w-[520px]"
            >
              <div className="absolute inset-0 z-10">
                <GlbHeart className="w-full h-full" />
              </div>
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  );
}
