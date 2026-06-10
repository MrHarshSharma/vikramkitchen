"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "All",
  "South Indian",
  "North Indian",
  "Chinese",
  "Continental",
  "Beverages",
];

const menuItems = [
  {
    name: "Masala Dosa",
    category: "South Indian",
    price: "₹80",
    description: "Crispy crepe filled with spiced potato masala, served with sambar & chutney",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070",
  },
  {
    name: "Idli Sambar",
    category: "South Indian",
    price: "₹60",
    description: "Soft steamed rice cakes served with aromatic sambar and coconut chutney",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070",
  },
  {
    name: "Medu Vada",
    category: "South Indian",
    price: "₹50",
    description: "Crispy urad dal fritters served with sambar and fresh coconut chutney",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=2080",
  },
  {
    name: "Uttapam",
    category: "South Indian",
    price: "₹70",
    description: "Thick rice pancake topped with onions, tomatoes, and green chillies",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=2030",
  },
  {
    name: "Paneer Butter Masala",
    category: "North Indian",
    price: "₹160",
    description: "Rich and creamy tomato-based curry with soft paneer cubes",
    tag: "Chef's Special",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2070",
  },
  {
    name: "Dal Tadka",
    category: "North Indian",
    price: "₹120",
    description: "Yellow lentils tempered with cumin, garlic, and aromatic spices",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2070",
  },
  {
    name: "Chole Bhature",
    category: "North Indian",
    price: "₹100",
    description: "Spicy chickpea curry served with fluffy deep-fried bread",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=2069",
  },
  {
    name: "Mix Veg Curry",
    category: "North Indian",
    price: "₹140",
    description: "Assorted seasonal vegetables cooked in a rich, spiced gravy",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2036",
  },
  {
    name: "Veg Manchurian",
    category: "Chinese",
    price: "₹120",
    description: "Crispy vegetable balls tossed in tangy, spicy Manchurian sauce",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=2070",
  },
  {
    name: "Hakka Noodles",
    category: "Chinese",
    price: "₹110",
    description: "Stir-fried noodles with fresh vegetables and Indo-Chinese sauces",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2092",
  },
  {
    name: "Veg Fried Rice",
    category: "Chinese",
    price: "₹100",
    description: "Aromatic rice wok-tossed with crisp vegetables and soy sauce",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=2025",
  },
  {
    name: "Pasta Arrabiata",
    category: "Continental",
    price: "₹150",
    description: "Penne pasta in a fiery tomato sauce with herbs and chilli flakes",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070",
  },
  {
    name: "Grilled Sandwich",
    category: "Continental",
    price: "₹80",
    description: "Toasted sandwich loaded with cheese, vegetables, and herbs",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=2073",
  },
  {
    name: "Masala Chai",
    category: "Beverages",
    price: "₹30",
    description: "Authentic Indian spiced tea brewed with fresh ginger and cardamom",
    tag: "Must Try",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=2070",
  },
];

export default function Menu() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? menuItems : menuItems.filter((item) => item.category === active);

  return (
    <section id="menu" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-secondary font-semibold tracking-[0.2em] uppercase text-sm">
            Delicious Offerings
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark mt-3 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our <span className="text-primary">Menu</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-white text-gray-600 hover:bg-primary/10 hover:text-primary border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {item.tag && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow">
                      {item.tag}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 px-2 py-1 bg-dark/70 text-white text-[10px] font-medium rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h4
                      className="text-lg font-bold text-dark"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {item.name}
                    </h4>
                    <span className="text-primary font-bold text-lg">{item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-400 text-sm mt-10"
        >
          * Prices are indicative. Please contact the restaurant for the latest menu and pricing.
        </motion.p>
      </div>
    </section>
  );
}
