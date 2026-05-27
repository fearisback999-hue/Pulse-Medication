"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { NAV_LINKS } from "@/lib/constants/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ease-out-expo",
        scrolled
          ? "bg-white/90 glass-panel-light"
          : "bg-white/70 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-[transform] duration-150 ease-out-expo active:scale-[0.97]"
          >
            <div className="relative">
              <Activity className="h-7 w-7 text-gold-500 transition-colors duration-200 ease-out-expo group-hover:text-gold-400" strokeWidth={1.5} />
            </div>
            <span className="text-lg font-bold font-heading text-navy-800 tracking-tight">
              Pulse Medication
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ease-out-expo",
                  pathname === link.href
                    ? "text-navy-800"
                    : "text-gray-500 hover:text-navy-800 hover:bg-gray-50/80"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0.5 left-4 right-4 h-[2px] bg-gold-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link
              href="/register"
              className="ml-3 bg-navy-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-[transform,background-color,box-shadow] duration-200 ease-out-expo hover:bg-navy-600 hover:shadow-card active:scale-[0.97] active:duration-100"
            >
              Register Now
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 -mr-2 text-navy-800 hover:bg-gray-100 rounded-lg transition-[background-color,transform] duration-150 ease-out-expo active:scale-[0.95]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, transform: "translateX(-8px)" }}
                  animate={{ opacity: 1, transform: "translateX(0px)" }}
                  transition={{
                    delay: i * 0.04,
                    duration: 0.3,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ease-out-expo",
                      pathname === link.href
                        ? "bg-navy-50 text-navy-800"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, transform: "translateX(-8px)" }}
                animate={{ opacity: 1, transform: "translateX(0px)" }}
                transition={{
                  delay: NAV_LINKS.length * 0.04,
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <Link
                  href="/register"
                  className="block bg-navy-700 text-white px-4 py-3 rounded-xl font-semibold text-sm text-center transition-[background-color,transform] duration-150 ease-out-expo hover:bg-navy-600 active:scale-[0.98] mt-2"
                >
                  Register Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
