"use client";

import { motion } from "framer-motion";
import {
  Video,
  Clock,
  Award,
  Users,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: Video,
    title: "Live Online Zoom Classes",
    description:
      "Real-time instruction with experienced healthcare educators from anywhere.",
  },
  {
    icon: Clock,
    title: "32 Contact Hours",
    description:
      "Comprehensive training over 4 intensive days of focused learning.",
  },
  {
    icon: Award,
    title: "Certificate Upon Completion",
    description:
      "Receive your Monitor Tech Certification upon passing the course.",
  },
  {
    icon: Users,
    title: "Beginner Friendly",
    description:
      "No prior healthcare experience needed. We welcome all backgrounds.",
  },
  {
    icon: ShieldCheck,
    title: "California BRN Approved",
    description:
      "Approved by the California Board of Registered Nursing for CE hours.",
  },
  {
    icon: Calendar,
    title: "Flexible Learning",
    description:
      "Online format allows you to learn from home with a flexible schedule.",
  },
];

export function FeatureCards() {
  return (
    <Section>
      <SectionHeading
        title="Why This Program Stands Out"
        subtitle="Our EKG Monitor Tech Certification is designed to prepare you for a successful career in cardiac monitoring."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card variant="feature" className="h-full">
              <feature.icon className="h-10 w-10 text-gold-500 mb-4" />
              <h3 className="text-lg font-bold font-heading text-navy-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
