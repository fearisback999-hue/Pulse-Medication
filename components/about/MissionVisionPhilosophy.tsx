"use client";

import { motion } from "framer-motion";
import { Target, Eye, BookOpen } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

const items = [
  {
    icon: Target,
    title: "Our Mission",
    content:
      "Pulse Medication's mission is to provide quality-oriented educational programs that increase student knowledge, improve practical skills, and foster critical thinking through efficient and accessible online healthcare education.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    content:
      "Prepare students for success in healthcare and allied health careers while supporting professional development and lifelong learning.",
  },
  {
    icon: BookOpen,
    title: "Our Philosophy",
    content:
      "We believe learning is a continuous, interactive, and supportive process built on professionalism, respect, and practical application.",
  },
];

export function MissionVisionPhilosophy() {
  return (
    <Section variant="light">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <Card className="h-full text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-navy-50 mb-4">
                <item.icon className="h-7 w-7 text-navy-700" />
              </div>
              <h3 className="text-xl font-bold font-heading text-navy-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.content}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
