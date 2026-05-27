"use client";

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
              className="flex-1 relative min-h-[400px] lg:min-h-0"
            >
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  );
}
