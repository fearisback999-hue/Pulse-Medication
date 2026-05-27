import type { Metadata } from "next";
import { LifelongLearning } from "@/components/about/LifelongLearning";
import { MissionVisionPhilosophy } from "@/components/about/MissionVisionPhilosophy";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Pulse Medication's mission, vision, and philosophy in providing quality healthcare education.",
};

export default function AboutPage() {
  return (
    <>
      <LifelongLearning />
      <MissionVisionPhilosophy />
    </>
  );
}
