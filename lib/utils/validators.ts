import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[\d\s\-().]{7,20}$/, "Please enter a valid phone number"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  message: z.string().optional(),
  street: z.string().min(1, "Street address is required"),
  street2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z
    .string()
    .min(1, "ZIP code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  country: z.string().default("United States"),
  courseSelection: z.string().default("EKG Monitor Tech Certification"),
  courseDate: z.string().min(1, "Please select a course date"),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
