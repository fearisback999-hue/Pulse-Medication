"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { TESTIMONIALS } from "@/lib/constants/testimonials";

export function Testimonials() {
  return (
    <Section>
      <SectionHeading
        title="What Our Students Say"
        subtitle="Hear from graduates who have successfully completed our Monitor Tech Certification program."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card variant="testimonial" className="h-full flex flex-col">
              <Quote className="h-8 w-8 text-gold-200 mb-3" />
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold-400 text-gold-400"
                  />
                ))}
              </div>
              <div>
                <p className="font-semibold text-navy-800 text-sm">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 text-xs">{testimonial.role}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
