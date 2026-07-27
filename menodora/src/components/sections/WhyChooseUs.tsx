"use client";

import { motion } from "framer-motion";
import { Gem, Truck, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";

type Feature = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    id: "quality",
    icon: Gem,
    title: "Premium Quality",
    description: "Every fabric is digitally printed with meticulous care and inspected before dispatch.",
  },
  {
    id: "delivery",
    icon: Truck,
    title: "Fast Delivery",
    description: "Nationwide shipping across Pakistan, packed securely to protect every piece.",
  },
  {
    id: "secure",
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Cash on Delivery, bank transfer, EasyPaisa, and JazzCash — pay your way, safely.",
  },
  {
    id: "exclusive",
    icon: Sparkles,
    title: "Limited Pieces",
    description: "Only 4 pieces per design — once they're gone, they're gone. True exclusivity.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-luxury-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-sm tracking-[0.3em] text-luxury-gold uppercase">
            The Menodora Promise
          </p>
          <h2 className="text-3xl font-bold text-luxury-white md:text-4xl">
            Why Choose Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-luxury-gold/30 bg-luxury-gold/5">
                  <Icon className="h-7 w-7 text-luxury-gold" />
                </div>
                <h3 className="text-lg font-semibold text-luxury-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}