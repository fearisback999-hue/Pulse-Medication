import { cn } from "@/lib/utils/cn";

type Variant = "default" | "feature" | "testimonial" | "objective";

interface CardProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  default:
    "bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-shadow duration-300",
  feature:
    "bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300",
  testimonial:
    "bg-white border border-gray-100 shadow-card",
  objective: "bg-navy-50/60 border border-navy-100/60",
};

export function Card({ variant = "default", className, children }: CardProps) {
  return (
    <div className={cn("rounded-2xl p-6", variantStyles[variant], className)}>
      {children}
    </div>
  );
}
