"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export type HeroCardData = {
  id: number;
  image: string;
  category?: string;
  title?: string;

};

type CardPosition = "center" | "left" | "right";

type CardVariant = {
  x: string;
  scale: number;
  zIndex: number;
  opacity: number;
};

const cardVariants: Record<CardPosition, CardVariant> = {
  center: { x: "0%", scale: 1.08, zIndex: 30, opacity: 1 },
  left: { x: "-38%", scale: 0.85, zIndex: 10, opacity: 0.75 },
  right: { x: "38%", scale: 0.85, zIndex: 10, opacity: 0.75 },
};

export function HeroCard({
  card,
  position,
  onHover,
}: {
  card: HeroCardData;
  position: CardPosition;
  onHover: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onFocus={onHover}
      tabIndex={0}
      animate={cardVariants[position]}
      transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.9 }}
      className="absolute top-1/2 left-1/2 h-95 w-65 -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-2xl md:h-110 md:w-75"
      style={{
        boxShadow:
          position === "center"
            ? "0 30px 60px -15px rgba(212,175,55,0.35), 0 10px 30px -10px rgba(0,0,0,0.6)"
            : "0 15px 30px -10px rgba(0,0,0,0.5)",
      }}
    >
      <Image
        src={card.image}
        alt={card.title ?? "Menodora fabric"}
        fill
        sizes="(max-width: 768px) 260px, 300px"
        className="object-cover"
        priority={position === "center"}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

      {(card.category || card.title ) && (
        <div className="absolute right-0 bottom-0 left-0 p-5">
          {card.category && (
            <p className="text-[11px] tracking-[0.25em] text-luxury-gold uppercase">
              {card.category}
            </p>
          )}
          {card.title && (
            <h3 className="mt-1 text-lg font-semibold text-white">{card.title}</h3>
          )}
         
        </div>
      )}
    </motion.div>
  );
}