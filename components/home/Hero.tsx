"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SplineScene } from "@/components/ui/splite";
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

function RobotChestOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Flame heart as full-background, BEHIND robot (z-0) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        className="absolute z-0 flex items-start justify-center"
        style={{ top: "-27.5%", left: "-10%", transform: "translateX(-50%)", width: "120%", height: "120%" }}
      >
        <motion.svg
          animate={visible ? { scale: [1, 1.04, 1, 1.06, 1] } : {}}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: [0.23, 1, 0.32, 1],
            times: [0, 0.15, 0.3, 0.45, 0.7],
          }}
          viewBox="-60 -60 320 320"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
        >
          <defs>
            {/* Gold halo behind the heart — matches the small floating gold hearts */}
            <radialGradient id="neon-heart-halo" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#E0C372" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
            </radialGradient>

            {/* Stroke gradient — orange to red neon tube */}
            <linearGradient id="neon-heart-stroke" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFB347" />
              <stop offset="40%" stopColor="#FF5A1F" />
              <stop offset="100%" stopColor="#FF1A1A" />
            </linearGradient>

            {/* Heavy outer bloom for the neon spread */}
            <filter id="neon-heart-bloom" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="20" result="b1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="38" result="b2" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Tight tube glow */}
            <filter id="neon-heart-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="g1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="g2" />
              <feMerge>
                <feMergeNode in="g2" />
                <feMergeNode in="g1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ambient halo — slowly expands to fill the whole background */}
          <motion.ellipse
            cx="100"
            cy="95"
            rx="130"
            ry="115"
            fill="url(#neon-heart-halo)"
            filter="url(#neon-heart-bloom)"
            initial={{ rx: 130, ry: 115, opacity: 0.6 }}
            animate={
              visible
                ? { rx: [130, 320, 310, 320], ry: [115, 320, 310, 320], opacity: [0.6, 0.85, 0.8, 0.85] }
                : {}
            }
            transition={{
              duration: 8,
              times: [0, 0.6, 0.8, 1],
              ease: [0.23, 1, 0.32, 1],
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0,
            }}
          />

          {/* Outer wide bloom */}
          <path
            d="M100 175 C 50 135, 15 100, 15 65 C 15 35, 40 15, 65 15 C 80 15, 92 22, 100 35 C 108 22, 120 15, 135 15 C 160 15, 185 35, 185 65 C 185 100, 150 135, 100 175 Z"
            stroke="url(#neon-heart-stroke)"
            strokeWidth="16"
            strokeLinejoin="round"
            fill="none"
            filter="url(#neon-heart-bloom)"
            opacity="0.55"
          />

          {/* Main neon tube */}
          <path
            d="M100 175 C 50 135, 15 100, 15 65 C 15 35, 40 15, 65 15 C 80 15, 92 22, 100 35 C 108 22, 120 15, 135 15 C 160 15, 185 35, 185 65 C 185 100, 150 135, 100 175 Z"
            stroke="url(#neon-heart-stroke)"
            strokeWidth="6"
            strokeLinejoin="round"
            fill="none"
            filter="url(#neon-heart-glow)"
          />

          {/* Hot inner core line */}
          <path
            d="M100 175 C 50 135, 15 100, 15 65 C 15 35, 40 15, 65 15 C 80 15, 92 22, 100 35 C 108 22, 120 15, 135 15 C 160 15, 185 35, 185 65 C 185 100, 150 135, 100 175 Z"
            stroke="#FFE3B0"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="none"
            opacity="0.95"
          />

          {/* Gold spark particles drifting up to match the aura */}
          {[
            { cx: 30, cy: 80, r: 1.3, color: "#FFD27A" },
            { cx: 170, cy: 70, r: 1, color: "#E0C372" },
            { cx: 185, cy: 110, r: 1.2, color: "#C9A84C" },
            { cx: 25, cy: 130, r: 1, color: "#D4AD4B" },
            { cx: 100, cy: 5, r: 1.4, color: "#FFD27A" },
            { cx: 60, cy: 25, r: 1, color: "#E0C372" },
            { cx: 140, cy: 25, r: 1.1, color: "#FFD27A" },
          ].map((p, i) => (
            <motion.circle
              key={i}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill={p.color}
              animate={visible ? { opacity: [0, 1, 0], cy: [p.cy, p.cy - 10] } : {}}
              transition={{
                duration: 1.5 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut",
              }}
              style={{ filter: `drop-shadow(0 0 4px ${p.color})` }}
            />
          ))}
        </motion.svg>
      </motion.div>

      {/* Logo + EKG anchored to TOP-RIGHT corner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.7, delay: 3, ease: [0.23, 1, 0.32, 1] }}
        className="absolute z-20 flex flex-col items-end gap-1"
        style={{ top: "5%", right: "5%" }}
      >
        <motion.span
          animate={visible ? { opacity: [0.7, 1, 0.7] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[10px] sm:text-xs lg:text-sm font-extrabold tracking-[0.25em] uppercase whitespace-nowrap"
          style={{
            color: "#FF3A3A",
            textShadow: "0 0 6px rgba(255,58,58,0.9), 0 0 14px rgba(255,26,26,0.55), 0 0 26px rgba(255,0,0,0.3)",
          }}
        >
          Pulse Medication
        </motion.span>

        <svg
          viewBox="0 0 200 50"
          className="w-20 sm:w-24 lg:w-28 h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="chest-ekg-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF1A1A" stopOpacity="0" />
              <stop offset="20%" stopColor="#FF3A3A" stopOpacity="1" />
              <stop offset="50%" stopColor="#FF6A6A" stopOpacity="1" />
              <stop offset="80%" stopColor="#FF3A3A" stopOpacity="1" />
              <stop offset="100%" stopColor="#FF1A1A" stopOpacity="0" />
            </linearGradient>
            <filter id="chest-ekg-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M0,25 L40,25 L55,25 L65,8 L75,42 L85,12 L92,32 L100,20 L108,25 L145,25 L160,25 L170,8 L180,42 L190,12 L200,25"
            fill="none"
            stroke="#FF1A1A"
            strokeWidth="1"
            strokeOpacity="0.25"
          />
          <path
            d="M0,25 L40,25 L55,25 L65,8 L75,42 L85,12 L92,32 L100,20 L108,25 L145,25 L160,25 L170,8 L180,42 L190,12 L200,25"
            fill="none"
            stroke="url(#chest-ekg-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#chest-ekg-glow)"
            className="ekg-animate"
          />
        </svg>
      </motion.div>
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <Card className="w-full border-white/[0.08] bg-black/[0.3] relative overflow-hidden rounded-2xl shadow-glass">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left: Text Content */}
            <div className="flex-1 p-8 sm:p-12 lg:p-16 relative z-10 flex flex-col justify-center">
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

            {/* Right: 3D Spline Scene */}
            <motion.div
              initial={{ opacity: 0, transform: "scale(0.96)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              transition={{ delay: 0.2, duration: 0.8, ease: EASE_OUT_EXPO }}
              className="flex-1 relative min-h-[400px] lg:min-h-0 overflow-hidden"
            >
              <RobotChestOverlay />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  );
}
