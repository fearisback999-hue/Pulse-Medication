import Link from "next/link";
import { Activity, Phone, Mail, MapPin } from "lucide-react";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-7 w-7 text-gold-500" />
              <span className="text-lg font-bold font-heading">
                Pulse Medication
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Providing quality healthcare education and monitor tech
              certification programs for aspiring healthcare professionals.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              CA BRN Approved Provider
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-gold-400 transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-gold-400 transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  {SITE_CONFIG.address.full}
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Pulse Medication. All rights
              reserved.
            </p>
            <p className="text-gray-600 text-xs">
              1240 S State College Blvd, Anaheim, CA 92806 &middot; (714) 539-7081
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
