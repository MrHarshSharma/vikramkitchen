"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Priya S.",
    rating: 5,
    text: "Best pure veg restaurant in Lakadganj! The masala dosa is absolutely crispy and the sambar is to die for. My family's go-to place for weekend breakfast.",
    date: "2 weeks ago",
    platform: "Google",
  },
  {
    name: "Rahul M.",
    rating: 5,
    text: "Amazing food quality at such affordable prices. The Paneer Butter Masala is rich and creamy. Love the homely atmosphere. Highly recommended!",
    date: "1 month ago",
    platform: "Zomato",
  },
  {
    name: "Sneha K.",
    rating: 4,
    text: "One of the best places for South Indian food in Nagpur. Their idli is super soft and the chutney varieties are excellent. Quick service too!",
    date: "3 weeks ago",
    platform: "Google",
  },
  {
    name: "Amit V.",
    rating: 5,
    text: "Veg Manchurian and Hakka Noodles are the best I've had in the area. The portions are generous and the taste is consistently good every time I visit.",
    date: "1 week ago",
    platform: "Zomato",
  },
  {
    name: "Kavita D.",
    rating: 4,
    text: "Lovely restaurant with a wide variety of cuisines. Perfect for families. The thali is value for money and covers everything you'd want in a meal.",
    date: "2 months ago",
    platform: "Google",
  },
  {
    name: "Rohan P.",
    rating: 5,
    text: "Started coming here for the breakfast dosa and now I'm hooked on everything. Clean place, good food, friendly staff. What more do you need?",
    date: "1 month ago",
    platform: "Google",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-[#c5b89a]" : "text-gray-500"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#2f3a2a] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-semibold tracking-[0.2em] uppercase text-sm">
            What People Say
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Customer <span className="text-secondary">Reviews</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />

          {/* Overall Rating */}
          <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="text-5xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                4.5
              </div>
              <div className="flex justify-center mt-1">
                <StarRating rating={5} />
              </div>
              <div className="text-white/50 text-sm mt-1">Google Reviews</div>
            </div>
            <div className="w-px h-16 bg-white/20 hidden sm:block" />
            <div className="text-center">
              <div className="text-5xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                4.0
              </div>
              <div className="flex justify-center mt-1">
                <StarRating rating={4} />
              </div>
              <div className="text-white/50 text-sm mt-1">Zomato Reviews</div>
            </div>
            <div className="w-px h-16 bg-white/20 hidden sm:block" />
            <div className="text-center">
              <div className="text-5xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                322+
              </div>
              <div className="text-white/50 text-sm mt-2">Total Reviews</div>
            </div>
          </div>
        </motion.div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              {/* Quote icon */}
              <svg className="w-8 h-8 text-primary/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-white/80 text-sm leading-relaxed mb-4">{review.text}</p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-white font-semibold text-sm">
                      {review.name[0]}
                    </div>
                    <span className="text-white font-medium text-sm">{review.name}</span>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <div className="text-right">
                  <span className="text-xs text-secondary font-medium">{review.platform}</span>
                  <div className="text-white/40 text-xs">{review.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
