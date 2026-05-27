import type { Metadata } from "next";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseDetails } from "@/components/course/CourseDetails";
import { CourseSchedule } from "@/components/course/CourseSchedule";
import { CourseObjectives } from "@/components/course/CourseObjectives";
import { CEHoursInfo } from "@/components/course/CEHoursInfo";

export const metadata: Metadata = {
  title: "EKG Monitor Tech Certification Course",
  description:
    "Comprehensive 4-day online EKG Monitor Tech Certification. 32 contact hours, CA BRN approved. Live Zoom instruction.",
};

export default function CoursePage() {
  return (
    <>
      <CourseHero />
      <CourseDetails />
      <CourseSchedule />
      <CourseObjectives />
      <CEHoursInfo />
    </>
  );
}
