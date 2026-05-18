"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, light, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={cn("text-center mb-16", className)}
    >
      <h2
        className={cn(
          "text-3xl sm:text-4xl font-bold font-heading mb-4",
          light ? "text-white" : "text-navy-800"
        )}
      >
        {title}
      </h2>
      <div className="w-16 h-1 bg-gold-500 rounded-full mx-auto mb-4" />
      {subtitle && (
        <p
          className={cn(
            "text-lg max-w-2xl mx-auto",
            light ? "text-gray-300" : "text-gray-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
