import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Pulse Medication Monitor Tech Certification course enrollment.",
};

export default function TermsPage() {
  return (
    <Section className="pt-8 sm:pt-28">
      <div className="max-w-3xl mx-auto prose prose-navy">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-800 tracking-tightest mb-2">Terms &amp; Conditions</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: January 1, 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">1. Agreement to Terms</h2>
            <p>By accessing and using the Pulse Medication website and enrolling in our courses, you agree to be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, please do not use our services.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">2. Course Enrollment</h2>
            <p>By registering for a course, you confirm that:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>All information provided during registration is accurate and complete</li>
              <li>You are at least 18 years of age</li>
              <li>You understand the course format (live online via Zoom)</li>
              <li>You have the necessary equipment (computer, internet, webcam) for online participation</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">3. Payment Terms</h2>
            <p>Course fees must be paid in full at the time of registration. All payments are processed securely through Stripe. Prices are listed in US dollars and are subject to change without prior notice for future course sessions.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">4. Attendance Requirements</h2>
            <p>Students are required to attend all scheduled class sessions. A certificate of completion will be issued only to students who:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Attend all four days of the course</li>
              <li>Actively participate in class activities</li>
              <li>Pass the final certification exam</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">5. Course Materials</h2>
            <p>Course materials are provided electronically and are for personal educational use only. Reproduction, distribution, or sharing of course materials without written permission from Pulse Medication is prohibited.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">6. Code of Conduct</h2>
            <p>Students are expected to maintain professional conduct throughout the course. Pulse Medication reserves the right to remove any student who disrupts the learning environment, engages in harassment, or violates academic integrity policies.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">7. Certification</h2>
            <p>The certificate of completion is issued by Pulse Medication and represents completion of the Monitor Tech / EKG course. This certificate does not constitute a state license or replace any required state or federal certifications needed for employment.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">8. Limitation of Liability</h2>
            <p>Pulse Medication provides educational services in good faith. We are not liable for any employment outcomes, career advancement, or clinical decisions made based on the training provided. Students are responsible for verifying certification requirements with their employers and regulatory bodies.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">9. Changes to Terms</h2>
            <p>Pulse Medication reserves the right to modify these Terms &amp; Conditions at any time. Changes will be posted on this page with an updated date. Continued use of our services constitutes acceptance of the revised terms.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-navy-800 tracking-tight mb-3">10. Contact</h2>
            <p>For questions regarding these terms, please contact:</p>
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
