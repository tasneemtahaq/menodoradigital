"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-luxury-black">
      {/* Placeholder background - will become a real image later */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-black/90 to-black" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm tracking-[0.3em] text-luxury-gold uppercase"
        >
          Welcome to {" "}
          <span className="text-luxury-gold font-bold text-2xl">Menodora</span> Premium Digital Fabrics
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-3xl text-4xl leading-tight font-bold text-luxury-white md:text-6xl"
        >
          Where Elegance Meets Every Thread
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-xl text-base text-gray-300 md:text-lg"
        >
          Discover Menodora&apos;s exclusive Rida fabric collections — crafted for those who value timeless luxury.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 mb-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/shop"
            className="rounded-full  bg-luxury-gold px-8 py-3 text-sm font-semibold tracking-wide text-luxury-black transition-colors hover:bg-luxury-gold-light"
          >
            SHOP NOW
          </Link>
          <Link
            href="/categories"
            className="rounded-full border border-luxury-gold px-8 py-3 text-sm font-semibold tracking-wide text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-luxury-black"
          >
            EXPLORE COLLECTION
          </Link>
        </motion.div>
      </div>
    </section>
  );
}