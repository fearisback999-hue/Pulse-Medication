"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { TESTIMONIALS } from "@/lib/constants/testimonials";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const avatarColors = [
  "bg-navy-700 text-gold-400",
  "bg-gold-500 text-navy-800",
  "bg-navy-600 text-gold-300",
  "bg-gold-600 text-white",
];

export function Testimonials() {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-navy-50/30 to-white pointer-events-none" />
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-gold-600 font-semibold text-sm tracking-wide uppercase mb-3">
            Student Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-800 tracking-tightest text-balance">
            Hear From Our Graduates
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-card"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold-400 text-gold-400"
                  />
                ))}
              </div>

              <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${avatarColors[index % avatarColors.length]}`}
                >
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <p className="font-semibold text-navy-800 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-400 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
