"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0v9l6.36 3.64" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12s1.5-2 4-2 4 2 4 2M9 16c.84.63 1.87 1 3 1s2.16-.37 3-1M12 3a2.5 2.5 0 00-1.5 4.5M12 3a2.5 2.5 0 011.5 4.5" />
      </svg>
    ),
    title: "100% Pure Veg",
    description: "Every dish is prepared with fresh, pure vegetarian ingredients — no compromises.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    title: "Expert Chefs",
    description: "Our skilled chefs bring decades of culinary expertise to every plate we serve.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Multi-Cuisine",
    description: "From South Indian dosas to North Indian curries, Chinese and Continental delights.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              <div className="flex justify-center mb-4">{feature.icon}</div>
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
