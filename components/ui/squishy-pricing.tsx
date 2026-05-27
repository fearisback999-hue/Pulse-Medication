"use client";

import { motion } from "framer-motion";

interface PricingCardProps {
  label: string;
  monthlyPrice: string;
  description: string;
  cta: string;
  background: string;
  features: string[];
  href?: string;
}

const PricingCard = ({
  label,
  monthlyPrice,
  description,
  cta,
  background,
  features,
  href = "/register",
}: PricingCardProps) => {
  return (
    <motion.div
      whileHover="hover"
      transition={{ duration: 0.6, ease: "backInOut" }}
      variants={{ hover: { scale: 1.05 } }}
      className={`relative h-auto min-h-96 w-80 shrink-0 overflow-hidden rounded-2xl p-8 ${background} shadow-lg hover:shadow-2xl transition-shadow`}
    >
      <div className="relative z-10 text-white">
        <span className="mb-3 inline-block rounded-full bg-white/20 backdrop-blur-sm px-4 py-1 text-sm font-semibold text-white border border-white/30">
          {label}
        </span>
        <motion.div
          initial={{ scale: 0.9 }}
          variants={{ hover: { scale: 1 } }}
          transition={{ duration: 0.6, ease: "backInOut" }}
          className="my-4 origin-top-left"
        >
          <span className="block font-mono text-5xl font-black leading-tight">
            ${monthlyPrice}
          </span>
          <span className="text-sm text-white/80">one-time investment</span>
        </motion.div>
        <p className="text-base text-white/90 mb-8 leading-relaxed">
          {description}
        </p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-white/90">
              <svg
                className="w-4 h-4 text-white flex-shrink-0"
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
      </div>
      <motion.a
        href={href}
        whileHover={{ y: -2 }}
        className="absolute bottom-6 left-6 right-6 z-20 block rounded-lg border-2 border-white bg-white py-3 text-center font-semibold uppercase text-navy-800 backdrop-blur-sm transition-all duration-200 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        {cta}
      </motion.a>
    </motion.div>
  );
};

export const PricingSection = () => {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
        <div className="flex flex-wrap justify-center gap-6 xl:gap-8">
          <PricingCard
            label="Early Bird"
            monthlyPrice="799"
            description="Perfect for individuals starting their healthcare career who want foundational EKG knowledge"
            cta="Enroll Now"
            background="bg-navy-700"
            features={[
              "4-day live online program",
              "32 contact hours",
              "Access to course materials",
              "Email support",
            ]}
          />
          <PricingCard
            label="Professional"
            monthlyPrice="950"
            description="Our most popular option. Comprehensive training with direct instructor access and priority support"
            cta="Start Learning"
            background="bg-navy-600"
            features={[
              "Everything in Early Bird",
              "Live Q&A sessions",
              "Certificate of completion",
              "Priority email support",
              "1 year material access",
            ]}
          />
          <PricingCard
            label="Premium"
            monthlyPrice="1299"
            description="Complete package with extended support, practice exams, and career guidance for serious professionals"
            cta="Get Premium"
            background="bg-gold-600"
            features={[
              "Everything in Professional",
              "Unlimited Q&A hours",
              "3 practice exams",
              "1-on-1 mentoring",
              "Lifetime material access",
              "Career coaching session",
            ]}
          />
        </div>
      </div>
    </section>
  );
};
