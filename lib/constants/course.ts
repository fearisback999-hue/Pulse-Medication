export const COURSE_INFO = {
  title: "EKG Monitor Tech Certification",
  format: "Live Online (Zoom)",
  duration: "4 Days",
  hours: "32 Contact Hours",
  schedule: "9:00 AM – 5:00 PM PST",
  price: 95000,
  priceDisplay: "$950",
  description:
    "Welcome to our specialized four-day program, offered entirely online via live Zoom sessions, designed to provide comprehensive training in interpreting basic cardiac rhythms (dysrhythmias).",
  fullDescription:
    "This course is tailored for ECG Monitor Technicians and allied healthcare professionals working in Emergency Departments, Critical Care Units, Post-Anesthesia Care Units, Operating Rooms, and Telemetry Units. The course is also beginner-friendly and welcomes students without prior healthcare experience.",
  materials: "Soft copy materials sent via email.",
  ceHours:
    "Provider approved by the California Board of Registered Nursing for 32 contact hours.",
} as const;

export const COURSE_DATES = [
  {
    id: "june-2026",
    label: "June 12, 13, 14 & 16, 2026 — 9:00 AM – 5:00 PM PST",
    dates: ["06/12/2026", "06/13/2026", "06/14/2026", "06/16/2026"],
    days: "Friday, Saturday, Sunday & Tuesday (Monday off for self-study)",
  },
] as const;

export const COURSE_SCHEDULE = [
  {
    day: "Day 1 — Friday, June 12",
    title: "Cardiac Anatomy & Conduction Basics",
    topics: [
      "Normal cardiac anatomy and blood flow",
      "Cardiac conduction system components",
      "Electrical impulse conduction",
      "ECG waves and intervals",
    ],
  },
  {
    day: "Day 2 — Saturday, June 13",
    title: "ECG Interpretation Foundations",
    topics: [
      "Five steps of rhythm interpretation",
      "Electrode placement techniques",
      "Basic rhythm recognition",
      "Sinus rhythms and variations",
    ],
  },
  {
    day: "Day 3 — Sunday, June 14",
    title: "Arrhythmia Recognition & Analysis",
    topics: [
      "Atrial arrhythmias",
      "Ventricular arrhythmias",
      "Heart blocks and AV conduction",
      "Telemetry rhythm strip analysis",
    ],
  },
  {
    day: "Day 4 — Tuesday, June 16",
    title: "Advanced Topics & Certification Exam",
    topics: [
      "Pacemaker basics and functionality",
      "Emergency cardiac rhythms",
      "Common arrhythmia medications",
      "Final certification exam",
    ],
  },
] as const;

export const COURSE_FEATURES = [
  "Live instructor-led Zoom learning",
  "Beginner friendly",
  "Flexible online format",
  "Professional healthcare curriculum",
  "Certificate upon successful completion",
  "Remediation and retesting opportunities",
  "CEU eligible contact hours",
  "Real-world telemetry and rhythm interpretation training",
] as const;
