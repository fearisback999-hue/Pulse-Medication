"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type Variant = "default" | "feature" | "testimonial" | "objective";

interface CardProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-white border border-gray-100 shadow-md",
  feature: "bg-white border-t-4 border-t-gold-500 border-x border-b border-gray-100 shadow-md",
  testimonial: "bg-white border border-gray-100 shadow-md",
  objective: "bg-navy-50 border border-navy-100",
};

export function Card({ variant = "default", className, children }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.2 }}
      className={cn("rounded-xl p-6", variantStyles[variant], className)}
    >
      {children}
    </motion.div>
  );
}
