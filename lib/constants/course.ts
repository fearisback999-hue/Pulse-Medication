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
    "This course is tailored for ECG Monitor Technicians and other allied health professionals working in Emergency Departments, Critical Care Units, Post-Anesthesia Care Units, Operating Rooms, and Telemetry Units. However, we enthusiastically welcome individuals without a medical background who are keen to learn about this vital aspect of cardiac monitoring. By the end of the program, you will have a solid foundation in dysrhythmia interpretation — a skill that is crucial in many healthcare settings.",
  materials: "Soft copy will be sent via email.",
  ceHours:
    "Provider approved by the California Board of Registered Nursing (Provider Number 17440), for 32 contact hours.",
  providerNumber: "17440",
} as const;

export const COURSE_DATES = [
  {
    id: "june-2026",
    label: "06/12, 06/13, 06/14, 06/16/2026 [9:00 AM – 5:00 PM]",
    dates: ["06/12/2026", "06/13/2026", "06/14/2026", "06/16/2026"],
    days: "Friday, Saturday, Sunday & Tuesday (Monday off for self-study)",
  },
  {
    id: "july-2026",
    label: "07/10, 07/11, 07/12, 07/14/2026 [9:00 AM – 5:00 PM]",
    dates: ["07/10/2026", "07/11/2026", "07/12/2026", "07/14/2026"],
    days: "Friday, Saturday, Sunday & Tuesday (Monday off for self-study)",
  },
  {
    id: "november-2026",
    label: "11/6, 11/7, 11/8, 11/10/2026 [9:00 AM – 5:00 PM]",
    dates: ["11/06/2026", "11/07/2026", "11/08/2026", "11/10/2026"],
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
  "Synchronous Online Learning — real-time instructor-led sessions from anywhere",
  "Inclusive to non-medical participants — no prior healthcare background required",
  "High course completion rate",
  "Opportunity for remediation and retesting",
  "Digital certificate of completion sent via email",
  "32 CEU clock hours approved for professional development",
  "Soft copy course materials sent via email",
  "Real-world telemetry and rhythm interpretation training",
] as const;
