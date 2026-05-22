"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { SITE_CONFIG } from "@/lib/constants/site";

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone.replace(/\D/g, "")}`,
    action: "Call Us",
  },
  {
    icon: Mail,
    title: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    action: "Email Us",
  },
  {
    icon: MapPin,
    title: "Address",
    value: SITE_CONFIG.address.full,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.address.full)}`,
    action: "Get Directions",
  },
  {
    icon: Clock,
    title: "Office Hours",
    value: "Monday – Friday, 9:00 AM – 5:00 PM PST",
    href: undefined,
    action: undefined,
  },
];

export function ContactInfo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to send message.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Section className="pt-8 sm:pt-28">
        <SectionHeading
          title="Contact Us"
          subtitle="Have questions about our EKG Monitor Tech Certification? We're here to help."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {contactCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-navy-50 mb-4">
                  <card.icon className="h-7 w-7 text-navy-700" />
                </div>
                <h3 className="text-lg font-bold font-heading text-navy-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-4">{card.value}</p>
                {card.href && (
                  <a
                    href={card.href}
                    target={card.title === "Address" ? "_blank" : undefined}
                    rel={card.title === "Address" ? "noopener noreferrer" : undefined}
                    className="text-gold-600 hover:text-gold-500 font-medium text-sm transition-colors"
                  >
                    {card.action} &rarr;
                  </a>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contact Form */}
      <Section variant="light">
        <div className="max-w-2xl mx-auto">
          <SectionHeading
            title="Send Us a Message"
            subtitle="Fill out the form below and we'll get back to you as soon as possible."
          />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold font-heading text-navy-800 mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out. We&apos;ll respond within 24 hours.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
                Send Another Message
              </Button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8"
            >
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-200"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner size="sm" className="border-white border-t-transparent" />
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </div>
      </Section>

      {/* Google Maps */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                title="Pulse Medication Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.8!2d-117.9114!3d33.8297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd7d2d7a3c0f1%3A0x0!2s1240+S+State+College+Blvd%2C+Anaheim%2C+CA+92806!5e0!3m2!1sen!2sus!4v1"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
