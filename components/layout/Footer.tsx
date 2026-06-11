import Link from "next/link";
import { Activity, Phone, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Course Overview", href: "/course" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Enrollment", href: "/register" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

export function Footer() {
  return (
    <footer className="gradient-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Activity className="h-6 w-6 text-gold-500" strokeWidth={1.5} />
              <span className="text-lg font-bold font-heading tracking-tight">
                Pulse Medication
              </span>
            </div>
            <p className="text-gray-400/80 text-sm leading-relaxed mb-4 max-w-xs">
              Providing quality healthcare education and monitor tech
              certification programs for aspiring healthcare professionals.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="w-1.5 h-1.5 bg-gold-500 rounded-full breathe" />
              <span className="text-gray-400 text-xs">
                CA BRN Approved Provider
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sm tracking-wide uppercase text-gray-300 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400/80 hover:text-white transition-colors duration-200 ease-out-expo text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sm tracking-wide uppercase text-gray-300 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 text-gray-400/80 hover:text-white transition-colors duration-200 ease-out-expo text-sm"
                >
                  <Phone className="h-4 w-4 flex-shrink-0 text-gray-500" strokeWidth={1.5} />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-gray-400/80 hover:text-white transition-colors duration-200 ease-out-expo text-sm"
                >
                  <Mail className="h-4 w-4 flex-shrink-0 text-gray-500" strokeWidth={1.5} />
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sm tracking-wide uppercase text-gray-300 mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400/80 hover:text-white transition-colors duration-200 ease-out-expo text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] py-6">
          <p className="text-gray-500/80 text-sm text-center">
            &#169; {new Date().getFullYear()} Pulse Medication. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
