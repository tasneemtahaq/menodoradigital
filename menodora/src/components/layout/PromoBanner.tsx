"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-0 z-40 flex w-full items-center justify-center bg-luxury-gold px-10 py-2.5 text-center text-xs font-semibold text-luxury-black sm:text-sm">
      <p>
        Get 5% off on your order for Limited Time— use code{" "}
        <span className="font-bold tracking-wide">WELCOMENEW</span> at checkout
      </p>
      <button
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss banner"
        className="absolute right-3 flex h-5 w-5 items-center justify-center text-luxury-black/70 hover:text-luxury-black"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}