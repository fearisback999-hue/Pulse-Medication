import { Suspense } from "react";
import { Section } from "@/components/ui/Section";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { PaymentContent } from "@/components/payment/PaymentContent";

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <Section className="pt-28">
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </Section>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
