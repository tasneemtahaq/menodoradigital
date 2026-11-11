"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import type { Product } from "./ProductCard";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock === 0;

  const baseClasses =
    "mt-4 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-colors";

  // Bangles need a size, so send the customer to the product page
  if (product.subCategory === "Bangles" && !isOutOfStock) {
    return (
      <Link
        href={`/products/${product.id}`}
        className={cn(baseClasses, "bg-gold-gradient text-luxury-black")}
      >
        Select Size
      </Link>
    );
  }

  return (
    <button
      onClick={() => addToCart(product, 1)}
      disabled={isOutOfStock}
      className={cn(
        baseClasses,
        isOutOfStock
          ? "cursor-not-allowed bg-neutral-700 text-white"
          : "bg-gold-gradient text-luxury-black"
      )}
    >
      <ShoppingBag className="h-4 w-4" />
      {isOutOfStock ? "Out of Stock" : "Add to Cart"}
    </button>
  );
}