export const SITE_CONFIG = {
  name: "Pulse Medication",
  phone: "(714) 337-2452",
  email: "Pulsemedication@gmail.com",
  coursePrice: 95000,
  coursePriceDisplay: "$950",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;
