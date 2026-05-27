import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Pulse Medication refund and cancellation policy for the Monitor Tech Certification course.",
};

export default function RefundPolicyPage() {
  return (
    <Section className="pt-8 sm:pt-28">
      <div className="max-w-3xl mx-auto prose prose-navy">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-800 tracking-tightest mb-2">Refund Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: January 1, 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">1. Cancellation Policy</h2>
            <p>We understand that circumstances may change. The following cancellation and refund guidelines apply to all course registrations:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>14+ days before course start:</strong> Full refund minus a $50 administrative fee</li>
              <li><strong>7–13 days before course start:</strong> 50% refund</li>
              <li><strong>Less than 7 days before course start:</strong> No refund</li>
              <li><strong>No-show / failure to attend:</strong> No refund</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">2. Course Rescheduling</h2>
            <p>If you are unable to attend your scheduled course dates, you may request to transfer your enrollment to a future course session, subject to availability. Transfer requests must be made at least 7 days before the original course start date. One transfer per enrollment is permitted at no additional charge.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">3. Course Cancellation by Pulse Medication</h2>
            <p>In the event that Pulse Medication cancels a course session (due to insufficient enrollment, instructor unavailability, or other circumstances), enrolled students will receive a full refund or the option to transfer to a future session at no additional cost.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">4. Refund Processing</h2>
            <p>Approved refunds will be processed within 5–10 business days. Refunds will be credited to the original payment method used during registration. Please allow additional time for your financial institution to process the credit.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">5. How to Request a Refund</h2>
            <p>To request a refund or course transfer, please contact us with your full name, registered email address, and course date:</p>
            <p className="mt-2">
              <strong>Pulse Medication</strong><br />
              Phone: (714) 539-7081<br />
              Email: Pulsemedication@gmail.com
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">6. Exceptions</h2>
            <p>Exceptions to this refund policy may be considered on a case-by-case basis for documented medical emergencies or extraordinary circumstances. Supporting documentation may be required.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
