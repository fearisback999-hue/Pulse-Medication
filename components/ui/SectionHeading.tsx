"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  light?: boolean;
  className?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  light,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-10 sm:mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "font-semibold text-sm tracking-wide uppercase mb-3",
            light ? "text-gold-400/80" : "text-gold-600"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl font-extrabold font-heading tracking-tightest text-balance",
          light ? "text-white" : "text-navy-800"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg mt-3 max-w-2xl leading-relaxed",
            align === "center" && "mx-auto",
            light ? "text-gray-300/80" : "text-gray-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
