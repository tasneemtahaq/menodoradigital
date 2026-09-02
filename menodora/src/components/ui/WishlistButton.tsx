"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";

export function WishlistButton({ productId }: { productId: string }) {
  const { productIds, toggleWishlist } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);
  const isFavorited = productIds.includes(productId);

  async function handleClick() {
    setIsLoading(true);
    const result = await toggleWishlist(productId);
    if (result.requiresLogin) {
      window.location.href = "/login";
    }
    setIsLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-colors hover:bg-black/70"
      aria-label="Add to wishlist"
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-colors",
          isFavorited ? "fill-luxury-gold text-luxury-gold" : "text-white"
        )}
      />
    </button>
  );
}