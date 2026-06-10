"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
          >
            <div>
              <h3
                className="text-2xl sm:text-3xl font-bold mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Hungry? We&apos;re Ready to Serve!
              </h3>
              <p className="text-white/80">
                Visit us today or call ahead to place your order.
              </p>
            </div>
            <a
              href="tel:+917972125194"
              className="px-8 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-cream transition-colors shadow-xl shrink-0"
            >
              +91 79721 25194
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.jpg"
                alt="The Vikram's Kitchen Logo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>
                  The Vikram&apos;s Kitchen
                </div>
                <div className="text-[10px] tracking-[0.2em] text-secondary uppercase">
                  Tradition &bull; Taste &bull; Trust
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Pure Veg Multi-Cuisine Restaurant serving authentic Indian and international
              vegetarian cuisine in Nagpur since day one.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-secondary" style={{ fontFamily: "var(--font-playfair)" }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "About", "Menu", "Specialties", "Reviews", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-white/60 text-sm hover:text-secondary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h4 className="font-bold mb-4 text-secondary" style={{ fontFamily: "var(--font-playfair)" }}>
              Our Cuisines
            </h4>
            <ul className="space-y-2">
              {["South Indian", "North Indian", "Chinese", "Continental", "Beverages", "Breakfast Special"].map(
                (cuisine) => (
                  <li key={cuisine} className="text-white/60 text-sm">
                    {cuisine}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold mb-4 text-secondary" style={{ fontFamily: "var(--font-playfair)" }}>
              Opening Hours
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Monday</span>
                <span className="text-white/90 font-medium">6:30 AM – 10:30 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Tue – Sun</span>
                <span className="text-white/90 font-medium">7:00 AM – 10:30 PM</span>
              </div>
              <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">
                  Open Now for
                </div>
                <div className="text-white/80 text-sm">
                  Breakfast &bull; Lunch &bull; Dinner
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} The Vikram&apos;s Kitchen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
