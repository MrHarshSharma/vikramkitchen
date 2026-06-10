"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  {
    name: "Meera T.",
    rating: 5,
    text: "The best uttapam I've ever had! Perfectly crispy on the outside, soft inside. The staff is so welcoming — feels like eating at home.",
    date: "3 weeks ago",
    platform: "Zomato",
  },
  {
    name: "Suresh N.",
    rating: 5,
    text: "We order from here almost every week. The consistency is remarkable. Chole Bhature and Masala Chai — unbeatable combo!",
    date: "2 weeks ago",
    platform: "Google",
  },
  {
    name: "Deepa R.",
    rating: 5,
    text: "Took my parents here for dinner and they absolutely loved it. The Dal Tadka reminded them of home cooking. Will definitely be coming back!",
    date: "1 month ago",
    platform: "Zomato",
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
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const currentReviews = reviews.slice(active * perPage, active * perPage + perPage);

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#2f3a2a] relative overflow-hidden">
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

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute -left-2 sm:-left-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-white/15 text-white/40 hover:text-secondary hover:border-secondary transition-all duration-300"
            aria-label="Previous reviews"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute -right-2 sm:-right-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-white/15 text-white/40 hover:text-secondary hover:border-secondary transition-all duration-300"
            aria-label="Next reviews"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {currentReviews.map((review, i) => (
                  <motion.div
                    key={review.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
                  >
                    {/* Quote icon */}
                    <svg className="w-8 h-8 text-primary/30 mb-4 group-hover:text-primary/50 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>

                    <p className="text-white/70 text-sm leading-relaxed mb-4 group-hover:text-white/85 transition-colors duration-300">
                      {review.text}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-white font-semibold text-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
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
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="relative h-[3px] overflow-hidden rounded-full transition-all duration-300"
                style={{ width: active === i ? 40 : 16 }}
                aria-label={`Go to page ${i + 1}`}
              >
                <div className="absolute inset-0 bg-white/15 rounded-full" />
                {active === i && (
                  <motion.div
                    className="absolute inset-0 bg-secondary rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: isPaused ? 99 : 5, ease: "linear" }}
                    style={{ transformOrigin: "left" }}
                    key={`progress-${active}-${isPaused}`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
