"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const collections = [
  {
    id: "ohbat",
    name: "OHBAT Collection",
    description: "Ideal for Summers",
    href: "/categories/ohbat",
  },
  {
    id: "noor",
    name: "Vintage Floral Series",
    description: "Soft tones for everyday elegance",
    href: "/categories/noor",
  },
  {
    id: "zareen",
    name: "Zareen Collection",
    description: "Embroidered series is Coming Soon",
    href: "/categories/zareen",
  },
];

export function FeaturedCollections() {
  return (
    <section className="bg-luxury-white px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-sm tracking-[0.3em] text-luxury-gold uppercase">
            Curated For You
          </p>
          <h2 className="text-3xl font-bold text-luxury-text md:text-4xl">
            Featured Collections
          </h2>
        </motion.div>

        {/* Collections grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                href={collection.href}
                className="group block overflow-hidden rounded-2xl bg-luxury-black shadow-md transition-shadow hover:shadow-xl"
              >
                {/* Placeholder image area */}
                <div className="flex h-80 items-center justify-center bg-linear-to-br from-luxury-black via-neutral-800 to-luxury-black transition-transform duration-500 group-hover:scale-105">
                  <span className="text-lg tracking-widest text-luxury-gold/40 uppercase">
                    {collection.name}
                  </span>
                </div>

                {/* Text below image */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-luxury-white">
                    {collection.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {collection.description}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-luxury-gold group-hover:underline">
                    View Collection →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}