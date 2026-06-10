"use client";

import { motion } from "framer-motion";

const specialties = [
  {
    title: "South Indian Breakfast",
    subtitle: "Start Your Day Right",
    description:
      "Wake up to the aroma of freshly steamed idlis, crispy dosas, and fluffy vadas — all served with our signature sambar and fresh coconut chutney. Available from early morning!",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=2080",
    stats: [
      { label: "Varieties", value: "15+" },
      { label: "Served From", value: "6:30 AM" },
    ],
  },
  {
    title: "North Indian Thali",
    subtitle: "A Complete Meal Experience",
    description:
      "Experience the richness of a complete North Indian thali — dal, sabzi, paneer, roti, rice, raita, papad, and dessert. A wholesome meal that satisfies every craving.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2036",
    stats: [
      { label: "Items", value: "8+" },
      { label: "Price From", value: "₹150" },
    ],
  },
  {
    title: "Chinese Favourites",
    subtitle: "Indo-Chinese Magic",
    description:
      "Our Indo-Chinese menu is a crowd favourite — from crispy Manchurian to sizzling noodles, every dish is packed with bold flavours and served piping hot.",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=2070",
    stats: [
      { label: "Dishes", value: "20+" },
      { label: "Top Pick", value: "Manchurian" },
    ],
  },
];

export default function Specialties() {
  return (
    <section id="specialties" className="py-20 sm:py-28 bg-white pattern-bg-diamond">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-semibold tracking-[0.2em] uppercase text-sm">
            What We Do Best
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark mt-3 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our <span className="text-primary">Specialties</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        {/* Specialties */}
        <div className="space-y-20">
          {specialties.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Image */}
              <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl group"
                >
                  <div
                    className="w-full h-[300px] sm:h-[400px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex gap-6">
                      {item.stats.map((stat) => (
                        <div key={stat.label} className="text-white">
                          <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                            {stat.value}
                          </div>
                          <div className="text-white/70 text-sm">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Text */}
              <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="text-secondary font-semibold text-sm tracking-wider uppercase">
                  {item.subtitle}
                </span>
                <h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark mt-2 mb-6"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                  {item.description}
                </p>
                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
                >
                  View Full Menu
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
