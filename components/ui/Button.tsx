"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-navy-700 text-white hover:bg-navy-600 shadow-lg hover:shadow-xl",
  secondary: "bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-lg hover:shadow-xl",
  outline:
    "border-2 border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white",
  ghost: "text-navy-700 hover:bg-navy-50",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href={href} className={classes}>
            {children}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export { Button };
