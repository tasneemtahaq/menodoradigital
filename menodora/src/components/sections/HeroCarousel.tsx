"use client";

import { useState } from "react";
import { HeroCard, type HeroCardData } from "./HeroCard";

const heroCards: HeroCardData[] = [
  {
    id: 1,
    image: "/images/11.jpg",
    category: "Cotton, wash n wear",
    title: "New Arrival",
  },
  {
    id: 2,
    image: "/images/22.jpg",
    category: "Cotton, wash n wear",
    title: "New Arrival",
  },
  {
    id: 3,
    image: "/images/33.jpg",
    category: "Cotton, wash n wear",
    title: "New Arrival",
  },
];

function getPosition(
  index: number,
  activeIndex: number
): "center" | "left" | "right" {
  const diff = (index - activeIndex + heroCards.length) % heroCards.length;
  if (diff === 0) return "center";
  if (diff === 1) return "right";
  return "left";
}

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className="relative mx-auto h-105 w-75 md:h-120 md:w-105"
      style={{ perspective: "1400px" }}
    >
      {heroCards.map((card, index) => (
        <HeroCard
          key={card.id}
          card={card}
          position={getPosition(index, activeIndex)}
          onHover={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
}