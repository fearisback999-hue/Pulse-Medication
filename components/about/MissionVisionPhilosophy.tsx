"use client";

import { motion } from "framer-motion";
import { Target, Eye, BookOpen } from "lucide-react";
import { Section } from "@/components/ui/Section";

const items = [
  {
    icon: Target,
    title: "Our Mission",
    content:
      "Pulse Medication's mission is to provide quality-oriented educational programs that increase student knowledge, improve practical skills, and foster critical thinking through efficient and accessible online healthcare education.",
    accent: "bg-navy-700",
  },
  {
    icon: Eye,
    title: "Our Vision",
    content:
      "Prepare students for success in healthcare and allied health careers while supporting professional development and lifelong learning.",
    accent: "bg-gold-500",
  },
  {
    icon: BookOpen,
    title: "Our Philosophy",
    content:
      "We believe learning is a continuous, interactive, and supportive process built on professionalism, respect, and practical application.",
    accent: "bg-navy-600",
  },
];

export function MissionVisionPhilosophy() {
  return (
    <Section variant="light">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0.5, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            className="relative bg-white rounded-2xl p-7 border border-gray-100 shadow-card overflow-hidden"
          >
            <div className={`absolute top-0 left-0 right-0 h-1 ${item.accent}`} />
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-navy-50 mb-5">
              <item.icon className="h-6 w-6 text-navy-700" />
            </div>
            <h3 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">
              {item.title}
            </h3>
            <p className="text-gray-500 text-[15px] leading-relaxed">
              {item.content}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
