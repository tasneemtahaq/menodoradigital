"use client";

import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import type { Product } from "./ProductCard";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock === 0;

  return (
    <button
      onClick={() => addToCart(product, 1)}
      disabled={isOutOfStock}
      className={cn(
        "mt-4 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-colors",
        isOutOfStock
          ? "cursor-not-allowed bg-neutral-700 text-gray-400"
          : "bg-luxury-gold text-luxury-black hover:bg-luxury-gold-light"
      )}
    >
      <ShoppingBag className="h-4 w-4" />
      {isOutOfStock ? "Out of Stock" : "Add to Cart"}
    </button>
  );
}