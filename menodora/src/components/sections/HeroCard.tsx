"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

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
  rotateY: number;
  z: number;
};

const cardVariants: Record<CardPosition, CardVariant> = {
  center: { x: "0%", scale: 1.08, zIndex: 30, opacity: 1, rotateY: 0, z: 80 },
  left: { x: "-38%", scale: 0.85, zIndex: 10, opacity: 0.65, rotateY: 28, z: -40 },
  right: { x: "38%", scale: 0.85, zIndex: 10, opacity: 0.65, rotateY: -28, z: -40 },
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
  const ref = useRef<HTMLDivElement>(null);

  // Mouse-tracked tilt, only meaningfully visible on the center card
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 150, damping: 20 });
  const springY = useSpring(tiltY, { stiffness: 150, damping: 20 });
  const rotateXTilt = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateYTilt = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || position !== "center") return;
    const rect = ref.current.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  const variant = cardVariants[position];

  return (
    <motion.div
      ref={ref}
      onMouseEnter={onHover}
      onFocus={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      animate={{
        x: variant.x,
        scale: variant.scale,
        zIndex: variant.zIndex,
        opacity: variant.opacity,
        rotateY: variant.rotateY,
        z: variant.z,
      }}
      style={{
        rotateX: position === "center" ? rotateXTilt : 0,
        ...(position === "center" ? { rotateY: rotateYTilt } : {}),
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.9 }}
      className="absolute top-1/2 left-1/2 h-95 w-65 -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-2xl md:h-110 md:w-75"
    >
      {/* Depth shadow / glow ring */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl"
        animate={{
          boxShadow:
            position === "center"
              ? "0 40px 80px -20px rgba(212,175,55,0.45), 0 15px 40px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.4)"
              : "0 20px 40px -15px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
        transition={{ duration: 0.4 }}
      />

      <Image
        src={card.image}
        alt={card.title ?? "Menodora fabric"}
        fill
        sizes="(max-width: 768px) 260px, 300px"
        className="object-cover"
        priority={position === "center"}
      />

      {/* Glass shine sweep on the active card */}
      {position === "center" && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-white/15 to-transparent"
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
        />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

      {(card.category || card.title) && (
        <div className="absolute right-0 bottom-0 left-0 border-t border-white/10 bg-black/20 p-5 backdrop-blur-sm">
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