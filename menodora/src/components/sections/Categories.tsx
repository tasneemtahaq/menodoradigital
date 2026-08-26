"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shirt, Wind, Layers, Flower2, type LucideIcon } from "lucide-react";

const categories: {
  id: string;
  name: string;
  icon: LucideIcon;
  accent: string;
}[] = [
  { id: "Cotton", name: "Cotton", icon: Shirt, accent: "from-amber-500/15" },
  { id: "Lawn", name: "Lawn", icon: Wind, accent: "from-emerald-500/15" },
  { id: "Mixed Fabric", name: "Mixed Fabric", icon: Layers, accent: "from-luxury-gold/15" },
  { id: "Embroidered", name: "Embroidered", icon: Flower2, accent: "from-rose-500/15" },
];

export function Categories() {
  return (
    <section id="categories" className="relative overflow-hidden bg-luxury-black px-6 py-24 md:px-12">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-luxury-gold/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm tracking-[0.3em] text-luxury-gold uppercase">
            Shop By Fabric
          </p>
          <h2 className="text-3xl font-bold text-luxury-white md:text-4xl">
            Categories
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-luxury-gold/50" />
        </motion.div>

        <div
          className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-x-8"
          style={{ perspective: "1200px" }}
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col items-center"
              >
                <Link
                  href={`/shop?category=${encodeURIComponent(category.id)}`}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    whileHover={{ rotateX: -8, rotateY: 8, scale: 1.03 }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="relative flex aspect-square w-36 items-center justify-center rounded-full border border-luxury-gold/20 bg-neutral-900 transition-[border-color] duration-300 group-hover:border-luxury-gold/70 sm:w-40 md:w-44"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 rounded-full opacity-[0.06]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, rgba(212,175,55,0.7) 0px, rgba(212,175,55,0.7) 1px, transparent 1px, transparent 9px)",
                      }}
                    />

                    <div
                      className={`pointer-events-none absolute inset-0 rounded-full bg-linear-to-br ${category.accent} via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    />

                    <div className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.35)]" />

                    <motion.div
                      className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-tr from-transparent via-luxury-gold/15 to-transparent"
                      initial={{ x: "-120%" }}
                      whileHover={{ x: "120%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />

                    <motion.div
                      className="pointer-events-none absolute inset-3 rounded-full border border-dashed border-transparent group-hover:border-luxury-gold/25"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                    />

                    <Icon
                      className="relative h-10 w-10 text-luxury-gold/70 transition-all duration-300 group-hover:scale-110 group-hover:text-luxury-gold md:h-11 md:w-11"
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  <span className="mt-5 text-base font-medium tracking-wide text-luxury-white transition-colors duration-300 group-hover:text-luxury-gold">
                    {category.name}
                  </span>
                  <span className="mt-2 block h-px w-0 bg-luxury-gold transition-all duration-500 group-hover:w-10" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}