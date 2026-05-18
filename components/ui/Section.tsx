import { cn } from "@/lib/utils/cn";

type Variant = "default" | "navy" | "light";

interface SectionProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  id?: string;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-white",
  navy: "gradient-navy text-white",
  light: "bg-gray-50",
};

export function Section({ variant = "default", className, children, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-20", variantStyles[variant], className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
