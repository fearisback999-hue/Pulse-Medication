"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className={cn("flex items-start gap-3 cursor-pointer", className)}>
          <input
            ref={ref}
            type="checkbox"
            className="mt-1 h-5 w-5 rounded border-gray-300 text-navy-700 focus:ring-navy-500 cursor-pointer"
            {...props}
          />
          <span className="text-sm text-gray-700">{label}</span>
        </label>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
export { Checkbox };
