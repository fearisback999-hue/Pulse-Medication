"use client";

import { forwardRef } from "react";
import Link from "next/link";
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
    "bg-navy-700 text-white hover:bg-navy-600 shadow-md hover:shadow-lg",
  secondary:
    "bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-md hover:shadow-lg font-bold",
  outline:
    "border-2 border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white",
  ghost: "text-navy-700 hover:bg-navy-50",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[15px]",
  lg: "px-8 py-3.5 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", href, children, ...props },
    ref
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98]",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
