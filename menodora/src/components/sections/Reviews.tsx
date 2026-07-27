"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
};

const reviews: Review[] = [
  {
    id: "1",
    name: "Ayesha K.",
    location: "Lahore",
    rating: 5,
    text: "The fabric quality exceeded my expectations. The print detail is stunning and it drapes beautifully.",
  },
  {
    id: "2",
    name: "Fatima R.",
    location: "Karachi",
    rating: 5,
    text: "Ordered the OHBAT collection — arrived well packed and exactly as shown. Will definitely order again.",
  },
  {
    id: "3",
    name: "Sana M.",
    location: "Islamabad",
    rating: 4,
    text: "Beautiful fabric and quick delivery. Customer service was very responsive when I asked about stock.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating
              ? "fill-luxury-gold text-luxury-gold"
              : "text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="bg-luxury-white px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-sm tracking-[0.3em] text-luxury-gold uppercase">
            Testimonials
          </p>
          <h2 className="text-3xl font-bold text-luxury-text md:text-4xl">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <StarRating rating={review.rating} />
              <p className="mt-4 text-sm leading-relaxed text-luxury-text">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="text-sm font-semibold text-luxury-text">
                  {review.name}
                </p>
                <p className="text-xs text-gray-500">{review.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}