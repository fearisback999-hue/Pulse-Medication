export const SITE_CONFIG = {
  name: "Pulse Medication",
  phone: "(714) 539-7081",
  email: "Pulsemedication@gmail.com",
  address: {
    street: "1240 S State College Blvd",
    city: "Anaheim",
    state: "CA",
    zip: "92806",
    full: "1240 S State College Blvd, Anaheim, CA 92806",
  },
  coursePrice: 95000,
  coursePriceDisplay: "$950",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;
