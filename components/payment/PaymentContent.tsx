"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { SITE_CONFIG } from "@/lib/constants/site";
import { COURSE_INFO } from "@/lib/constants/course";

export function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const registrationId =
    searchParams.get("registrationId") ??
    (typeof window !== "undefined"
      ? sessionStorage.getItem("registrationId")
      : null);

  useEffect(() => {
    if (success) {
      setLoading(false);
      return;
    }
    if (!registrationId) {
      router.push("/register");
      return;
    }
    setLoading(false);
  }, [registrationId, success, router]);

  if (success) {
    return (
      <Section className="pt-8 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto text-center"
        >
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold font-heading text-navy-800 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-2">
            Thank you for enrolling in the EKG Monitor Tech Certification
            program.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            A confirmation email with your receipt and course details will be
            sent to your email shortly.
          </p>
          <Button href="/" variant="primary">
            Return Home
          </Button>
        </motion.div>
      </Section>
    );
  }

  if (canceled) {
    return (
      <Section className="pt-8 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto text-center"
        >
          <XCircle className="h-20 w-20 text-red-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold font-heading text-navy-800 mb-4">
            Payment Canceled
          </h1>
          <p className="text-gray-600 mb-8">
            Your payment was not processed. You can try again when you&#39;re
            ready.
          </p>
          <Button
            href={`/payment?registrationId=${registrationId}`}
            variant="primary"
          >
            Try Again
          </Button>
        </motion.div>
      </Section>
    );
  }

  if (loading) {
    return (
      <Section className="pt-8 sm:pt-28">
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </Section>
    );
  }

  const handlePayment = async () => {
    setProcessingPayment(true);
    setError(null);

    try {
      const res = await fetch("/api/payment/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to create checkout session.");
      }

      const { sessionUrl } = await res.json();
      window.location.href = sessionUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setProcessingPayment(false);
    }
  };

  return (
    <Section className="pt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto"
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl font-bold font-heading text-navy-800 mb-6">
            Complete Your Payment
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-8">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">Course</span>
              <span className="font-medium text-navy-800">
                {COURSE_INFO.title}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">Duration</span>
              <span className="font-medium text-navy-800">
                {COURSE_INFO.duration} — {COURSE_INFO.hours}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-500">Total</span>
              <span className="text-2xl font-bold text-navy-800">
                {SITE_CONFIG.coursePriceDisplay}
              </span>
            </div>
          </div>

          <Button
            onClick={handlePayment}
            variant="secondary"
            size="lg"
            className="w-full"
            disabled={processingPayment}
          >
            {processingPayment ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner
                  size="sm"
                  className="border-navy-900 border-t-transparent"
                />
                Redirecting to checkout...
              </span>
            ) : (
              <>
                Pay {SITE_CONFIG.coursePriceDisplay}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-xs">
            <ShieldCheck className="h-4 w-4" />
            Secure payment powered by Stripe
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
