"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { TESTIMONIALS } from "@/lib/constants/testimonials";

export function Testimonials() {
  const testimonialData = TESTIMONIALS.map((t, idx) => ({
    text: t.quote,
    image: `https://randomuser.me/api/portraits/${idx % 2 === 0 ? "women" : "men"}/${idx + 1}.jpg`,
    name: t.name,
    role: t.role,
  }));

  const firstColumn = testimonialData.slice(0, 2);
  const secondColumn = testimonialData.slice(2, 4);

  return (
    <Section className="relative overflow-hidden py-20">
      <div className="relative">
        <motion.div
          initial={{ y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-gold-600 font-semibold text-sm tracking-wide uppercase mb-3">
            Student Testimonials
          </p>
          <h2 className="text-4xl font-extrabold font-heading text-navy-800 tracking-tightest mb-4">
            Hear From Our Graduates
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what healthcare professionals have to say about their experience
            with the Pulse Medication Monitor Tech Certification program.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[600px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
        </div>
      </div>
    </Section>
  );
}
