"use client";

import { motion } from "framer-motion";

const EASE_OUT_EXPO = [0.23, 1, 0.32, 1] as const;

interface PricingCardProps {
  label: string;
  price: string;
  description: string;
  cta: string;
  background: string;
  features: string[];
  href?: string;
  index: number;
}

const PricingCard = ({
  label,
  price,
  description,
  cta,
  background,
  features,
  href = "/register",
  index,
}: PricingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(20px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: EASE_OUT_EXPO,
      }}
      whileHover="hover"
      className={`relative h-auto min-h-96 w-full sm:w-80 shrink-0 overflow-hidden rounded-2xl p-8 ${background} transition-[box-shadow] duration-300 ease-out-expo shadow-card-elevated hover:shadow-glow-gold-strong`}
    >
      <motion.div
        variants={{ hover: { transform: "scale(1.03)" } }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative z-10 text-white origin-top-left"
      >
        <span className="mb-3 inline-block rounded-full bg-white/[0.12] backdrop-blur-sm px-4 py-1 text-sm font-semibold text-white border border-white/[0.15] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          {label}
        </span>
        <div className="my-4">
          <span className="block font-mono text-5xl font-black leading-tight">
            ${price}
          </span>
          <span className="text-sm text-white/70 mt-1 block">one-time investment</span>
        </div>
        <p className="text-base text-white/85 mb-8 leading-relaxed max-w-[40ch]">
          {description}
        </p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2.5 text-sm text-white/85">
              <svg
                className="w-4 h-4 text-white/70 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </motion.div>
      <a
        href={href}
        className="absolute bottom-6 left-6 right-6 z-20 block rounded-xl border-2 border-white bg-white py-3 text-center font-semibold uppercase text-navy-800 transition-[transform,box-shadow] duration-150 ease-out-expo hover:shadow-card-elevated active:scale-[0.97] active:duration-100 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
      >
        {cta}
      </a>
    </motion.div>
  );
};

const plans = [
  {
    label: "Early Bird",
    price: "799",
    description: "Perfect for individuals starting their healthcare career who want foundational EKG knowledge",
    cta: "Enroll Now",
    background: "bg-navy-700",
    features: [
      "4-day live online program",
      "32 contact hours",
      "Access to course materials",
      "Email support",
    ],
  },
  {
    label: "Professional",
    price: "950",
    description: "Our most popular option. Comprehensive training with direct instructor access and priority support",
    cta: "Start Learning",
    background: "bg-navy-600",
    features: [
      "Everything in Early Bird",
      "Live Q&A sessions",
      "Certificate of completion",
      "Priority email support",
      "1 year material access",
    ],
  },
  {
    label: "Premium",
    price: "1299",
    description: "Complete package with extended support, practice exams, and career guidance for serious professionals",
    cta: "Get Premium",
    background: "bg-gold-600",
    features: [
      "Everything in Professional",
      "Unlimited Q&A hours",
      "3 practice exams",
      "1-on-1 mentoring",
      "Lifetime material access",
      "Career coaching session",
    ],
  },
];

export const PricingSection = () => {
  return (
    <section className="bg-white px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(16px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="text-center mb-16"
        >
          <p className="text-gold-600 font-semibold text-sm tracking-wide uppercase mb-3">
            Flexible Pricing
          </p>
          <h2 className="text-4xl font-extrabold font-heading text-navy-800 tracking-tightest mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the certification package that best fits your schedule and learning goals.
          </p>
        </motion.div>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center sm:items-stretch gap-6 xl:gap-8">
          {plans.map((plan, i) => (
            <PricingCard key={plan.label} {...plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
