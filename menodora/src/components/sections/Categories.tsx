"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { id: "cotton", name: "Cotton" },
  { id: "mixed", name: "Mixed" },
  { id: "embroidered", name: "Embroidered" },
  { id: "lawn", name: "Lawn" },
];

export function Categories() {
  return (
    <section className="bg-luxury-black px-6 py-24 md:px-12">
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
            Shop By Fabric
          </p>
          <h2 className="text-3xl font-bold text-luxury-white md:text-4xl">
            Categories
          </h2>
        </motion.div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/categories/${category.id}`}
                className="group relative flex h-48 items-center justify-center overflow-hidden rounded-xl border border-luxury-gold/20 bg-neutral-900 transition-colors hover:border-luxury-gold"
              >
                <span className="text-lg font-medium tracking-wide text-luxury-white transition-colors group-hover:text-luxury-gold">
                  {category.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}