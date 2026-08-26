"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HeroCarousel } from "./HeroCarousel";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-luxury-black px-6 py-32 md:px-12">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-black/95 to-black" />

      {/* Ambient gold glow orbs */}
      <motion.div
        className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-luxury-gold/10 blur-[120px]"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-luxury-gold/10 blur-[100px]"
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Faint grid texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-2">
        {/* Left: text content */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-sm tracking-[0.3em] text-luxury-gold uppercase"
          >
            Premium Digital Printed Fabrics
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-xl text-4xl leading-tight font-bold text-luxury-white md:text-6xl"
          >
            Where Elegance Meets Every Thread
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-lg text-base text-gray-300 md:text-lg"
          >
            Discover Menodora&apos;s exclusive abaya fabric collections —
            crafted for those who value timeless luxury.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/shop"
              className="group relative overflow-hidden rounded-full bg-luxury-gold px-8 py-3 text-sm font-semibold tracking-wide text-luxury-black transition-transform hover:scale-[1.03]"
            >
              <span className="relative z-10">SHOP NOW</span>
              <span className="absolute inset-0 -translate-x-full bg-luxury-gold-light transition-transform duration-500 group-hover:translate-x-0" />
            </Link>
            <Link
              href="/new-arrivals"
              className="rounded-full border border-luxury-gold px-8 py-3 text-sm font-semibold tracking-wide text-luxury-gold transition-all hover:scale-[1.03] hover:bg-luxury-gold hover:text-luxury-black"
            >
              EXPLORE COLLECTION
            </Link>
          </motion.div>
        </div>

        {/* Right: interactive 3D carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <HeroCarousel />
        </motion.div>
      </div>
    </section>
  );
}