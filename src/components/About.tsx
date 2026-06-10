"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "100% Pure Veg",
    description: "Every dish is prepared with fresh, pure vegetarian ingredients — no compromises.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
      </svg>
    ),
    title: "Expert Chefs",
    description: "Our skilled chefs bring decades of culinary expertise to every plate we serve.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Multi-Cuisine",
    description: "From South Indian dosas to North Indian curries, Chinese and Continental delights.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: "Affordable",
    description: "Premium quality dining experience at pocket-friendly prices for everyone.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-semibold tracking-[0.2em] uppercase text-sm">
            Our Story
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark mt-3 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            A Legacy of <span className="text-primary">Flavour</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="w-full h-[400px] sm:h-[500px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2071')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 sm:right-8 bg-primary text-white px-6 py-4 rounded-2xl shadow-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                Since
              </div>
              <div className="text-sm opacity-90">Serving Nagpur</div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3
              className="text-2xl sm:text-3xl font-bold text-dark mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Where Tradition Meets
              <br />
              <span className="text-primary">Culinary Excellence</span>
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6 text-base sm:text-lg">
              Nestled in the heart of Lakadganj, Nagpur, The Vikram&apos;s Kitchen is more than just
              a restaurant &mdash; it&apos;s a home for food lovers. We take pride in serving
              authentic, pure vegetarian multi-cuisine dishes that bring families together.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 text-base sm:text-lg">
              From the aromatic spices of our North Indian curries to the crispy perfection of our
              South Indian dosas, every dish is crafted with love, tradition, and the finest
              ingredients. Our Chinese and Continental offerings add a global twist to our proudly
              Indian kitchen.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-accent bg-accent/10 px-4 py-2 rounded-full">
                <span>✓</span> Dine-In
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-accent bg-accent/10 px-4 py-2 rounded-full">
                <span>✓</span> Takeaway
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-accent bg-accent/10 px-4 py-2 rounded-full">
                <span>✓</span> Delivery
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-accent bg-accent/10 px-4 py-2 rounded-full">
                <span>✓</span> Booking
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-cream rounded-2xl p-6 text-center hover:shadow-xl transition-shadow duration-300 border border-primary/5"
            >
              <div className="flex justify-center text-primary mb-4">{feature.icon}</div>
              <h4
                className="text-lg font-bold text-dark mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {feature.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
