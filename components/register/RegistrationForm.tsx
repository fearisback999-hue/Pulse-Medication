"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { registrationSchema, type RegistrationFormData } from "@/lib/utils/validators";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { COURSE_DATES } from "@/lib/constants/course";
import { US_STATES } from "@/lib/constants/states";

const COUNTRIES = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "Mexico", label: "Mexico" },
  { value: "Other", label: "Other" },
];

export function RegistrationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      country: "United States",
      courseSelection: "EKG Monitor Tech Certification",
      courseDate: COURSE_DATES[0]?.label ?? "",
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Registration failed. Please try again.");
      }

      const { registrationId } = await res.json();
      sessionStorage.setItem("registrationId", registrationId);
      router.push(`/payment?registrationId=${registrationId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8 lg:p-10"
    >
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <h3 className="text-xl font-bold font-heading text-navy-800 mb-6">
        Personal Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Input
          label="First Name"
          required
          {...register("firstName")}
          error={errors.firstName?.message}
          placeholder="John"
        />
        <Input
          label="Last Name"
          required
          {...register("lastName")}
          error={errors.lastName?.message}
          placeholder="Doe"
        />
        <Input
          label="Phone Number"
          required
          type="tel"
          {...register("phone")}
          error={errors.phone?.message}
          placeholder="(555) 123-4567"
        />
        <Input
          label="Email Address"
          required
          type="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="john@example.com"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message (Optional)
        </label>
        <textarea
          {...register("message")}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Any questions or comments..."
        />
      </div>

      <h3 className="text-xl font-bold font-heading text-navy-800 mb-6">
        Mailing Address
      </h3>
      <div className="space-y-4 mb-8">
        <Input
          label="Street Address"
          required
          {...register("street")}
          error={errors.street?.message}
          placeholder="123 Main St"
        />
        <Input
          label="Address Line 2"
          {...register("street2")}
          placeholder="Apt, Suite, Unit (optional)"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="City"
            required
            {...register("city")}
            error={errors.city?.message}
            placeholder="Anaheim"
          />
          <Select
            label="State"
            required
            options={US_STATES.map((s) => ({ value: s.value, label: s.label }))}
            {...register("state")}
            error={errors.state?.message}
          />
          <Input
            label="ZIP Code"
            required
            {...register("zip")}
            error={errors.zip?.message}
            placeholder="92806"
          />
        </div>
        <Select
          label="Country"
          required
          options={COUNTRIES}
          {...register("country")}
          error={errors.country?.message}
        />
      </div>

      <h3 className="text-xl font-bold font-heading text-navy-800 mb-6">
        Course Selection
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Select
          label="Course"
          required
          options={[
            { value: "EKG Monitor Tech Certification", label: "EKG Monitor Tech Certification" },
          ]}
          {...register("courseSelection")}
          error={errors.courseSelection?.message}
        />
        <Select
          label="Course Date & Time"
          required
          options={COURSE_DATES.map((d) => ({ value: d.label, label: d.label }))}
          {...register("courseDate")}
          error={errors.courseDate?.message}
        />
      </div>

      <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <Checkbox
          label={
            <span>
              By submitting this form, I agree to the Privacy Policy and Refund
              Policy. I understand that Pulse Medication may contact me via
              phone, email, or text regarding course registration and updates.
            </span>
          }
          {...register("termsAccepted")}
          error={errors.termsAccepted?.message}
        />
      </div>

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <LoadingSpinner size="sm" className="border-navy-900 border-t-transparent" />
            Processing...
          </span>
        ) : (
          "Proceed to Payment — $950"
        )}
      </Button>
    </motion.form>
  );
}
