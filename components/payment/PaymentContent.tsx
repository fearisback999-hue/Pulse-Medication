"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  ShieldCheck,
  Award,
  Clock,
  Mail,
} from "lucide-react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { SITE_CONFIG } from "@/lib/constants/site";
import { COURSE_INFO } from "@/lib/constants/course";
import { getStripe } from "@/lib/stripe/client";

export function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentVerified, setPaymentVerified] = useState(false);

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const sessionId = searchParams.get("session_id");
  const isMock = searchParams.get("mock") === "true";
  const registrationId =
    searchParams.get("registrationId") ??
    (typeof window !== "undefined"
      ? sessionStorage.getItem("registrationId")
      : null);

  useEffect(() => {
    if (success) {
      // Don't trust the URL — confirm with Stripe that the session was paid
      // before showing the success screen. (mock dev flow is allowed through.)
      if (isMock) {
        setPaymentVerified(true);
        setLoading(false);
        return;
      }
      fetch("/api/payment/verify-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => res.json())
        .then((data) => setPaymentVerified(!!data.paid))
        .catch(() => setPaymentVerified(false))
        .finally(() => setLoading(false));
      return;
    }
    if (!registrationId) {
      router.push("/register");
      return;
    }
    setLoading(false);
  }, [registrationId, success, isMock, sessionId, router]);

  if (loading) {
    return (
      <Section className="pt-8 sm:pt-28">
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </Section>
    );
  }

  if (success && !paymentVerified) {
    return (
      <Section className="pt-8 sm:pt-28">
        <motion.div
          initial={{ scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6">
            <XCircle className="h-10 w-10 text-red-400" />
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-navy-800 tracking-tightest mb-3">
            Payment Not Confirmed
          </h1>
          <p className="text-gray-500 mb-8">
            We couldn&apos;t verify your payment. If you were charged, please
            contact us and we&apos;ll sort it out right away.
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

  if (success) {
    return (
      <Section className="pt-8 sm:pt-28">
        <motion.div
          initial={{ scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-navy-800 tracking-tightest mb-3">
            Payment Successful
          </h1>
          <p className="text-gray-600 mb-2">
            You&apos;re enrolled in the EKG Monitor Tech Certification program.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            A confirmation email with your receipt and course details will arrive
            shortly.
          </p>

          <div className="bg-gray-50/70 rounded-2xl p-5 mb-8 border border-gray-100 text-left">
            <h3 className="font-bold text-navy-800 text-sm mb-3">
              What happens next:
            </h3>
            <ul className="space-y-2.5">
              {[
                {
                  icon: Mail,
                  text: "Check your email for a confirmation with course details",
                },
                {
                  icon: Clock,
                  text: "Zoom link will be sent before the course start date",
                },
                {
                  icon: Award,
                  text: "Course materials will be provided in PDF format",
                },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <item.icon className="h-4 w-4 text-gold-500 flex-shrink-0 mt-0.5" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

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
          initial={{ scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6">
            <XCircle className="h-10 w-10 text-red-400" />
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-navy-800 tracking-tightest mb-3">
            Payment Canceled
          </h1>
          <p className="text-gray-500 mb-8">
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

  // EmbeddedCheckoutProvider needs a stable callback returning the
  // client_secret. We fetch it from our API, which creates a Stripe Checkout
  // Session in embedded mode for this registration.
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/payment/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registrationId }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const message =
        body.error || "Failed to start checkout. Please try again.";
      setError(message);
      throw new Error(message);
    }
    const { clientSecret } = await res.json();
    return clientSecret as string;
  }, [registrationId]);

  return (
    <Section className="pt-28">
      <motion.div
        initial={{ y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-card-hover border border-gray-100 p-5 sm:p-7 md:p-8">
          <h1 className="text-2xl font-extrabold font-heading text-navy-800 tracking-tightest mb-6">
            Complete Your Payment
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-0 mb-6">
            {[
              { label: "Course", value: COURSE_INFO.title },
              {
                label: "Duration",
                value: `${COURSE_INFO.duration} — ${COURSE_INFO.hours}`,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between py-3.5 border-b border-gray-100"
              >
                <span className="text-gray-400 text-sm">{row.label}</span>
                <span className="font-medium text-navy-800 text-sm">
                  {row.value}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-baseline pt-4">
              <span className="text-gray-400 text-sm">Total</span>
              <span className="text-2xl font-extrabold text-navy-800 font-heading tracking-tightest">
                {SITE_CONFIG.coursePriceDisplay}
              </span>
            </div>
          </div>

          {/* Stripe's Embedded Checkout — card form lives right here on
              our page; on success Stripe redirects to return_url. */}
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <EmbeddedCheckoutProvider
              stripe={getStripe()}
              options={{ fetchClientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-xs">
            <ShieldCheck className="h-3.5 w-3.5" />
            Secure payment powered by Stripe
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
