import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Pulse Medication privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <Section className="pt-8 sm:pt-28">
      <div className="max-w-3xl mx-auto prose prose-navy">
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-navy-800 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: January 1, 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 mb-3">1. Information We Collect</h2>
            <p>When you register for a course or contact us, we may collect the following personal information:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Mailing address</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Course enrollment details</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Process course registrations and payments</li>
              <li>Send course materials and Zoom access information</li>
              <li>Communicate about your enrollment and course updates</li>
              <li>Send certificates of completion</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 mb-3">3. Payment Security</h2>
            <p>All payment transactions are processed through Stripe, a PCI-DSS Level 1 certified payment processor. We do not store your credit card information on our servers. Stripe&apos;s security measures protect your financial data during and after transactions.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 mb-3">4. Data Protection</h2>
            <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Your data is stored on secure, encrypted servers.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 mb-3">5. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share information with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Payment processors (Stripe) for transaction processing</li>
              <li>Email service providers for course communications</li>
              <li>Regulatory bodies as required by law (e.g., California BRN)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 mb-3">7. Cookies</h2>
            <p>Our website may use cookies to enhance your browsing experience. These are small files stored on your device that help us understand how you use our website and improve its functionality.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 mb-3">8. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or your personal data, please contact us:</p>
            <p className="mt-2">
              <strong>Pulse Medication</strong><br />
              1240 S State College Blvd, Anaheim, CA 92806<br />
              Phone: (714) 539-7081<br />
              Email: Pulsemedication@gmail.com
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
