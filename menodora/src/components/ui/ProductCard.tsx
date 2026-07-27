"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  stock: number;
};

export function ProductCard({ product }: { product: Product }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { addToCart } = useCart();
  const isOutOfStock = product.stock === 0;
  const hasDiscount = product.discountPrice !== undefined;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-neutral-900">
      {/* Image area */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative flex h-72 items-center justify-center overflow-hidden bg-linear-to-br from-neutral-800 to-neutral-900 transition-transform duration-500 group-hover:scale-105">
          <span className="text-sm tracking-widest text-luxury-gold/30 uppercase">
            {product.name}
          </span>

          {/* Discount badge */}
          {hasDiscount && (
            <span className="absolute top-3 left-3 rounded-full bg-luxury-gold px-3 py-1 text-xs font-semibold text-luxury-black">
              SALE
            </span>
          )}

          {/* Out of stock badge */}
          {isOutOfStock && (
            <span className="absolute top-3 left-3 rounded-full bg-neutral-700 px-3 py-1 text-xs font-semibold text-white">
              OUT OF STOCK
            </span>
          )}
        </div>
      </Link>

      {/* Favorite button */}
      <button
        onClick={() => setIsFavorited(!isFavorited)}
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

      {/* Info */}
      <div className="p-5">
        <p className="text-xs tracking-wide text-gray-400 uppercase">
          {product.category}
        </p>
        <h3 className="mt-1 text-base font-semibold text-luxury-white">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-luxury-gold">
                Rs. {product.discountPrice?.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 line-through">
                Rs. {product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-luxury-gold">
              Rs. {product.price.toLocaleString()}
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-gray-500">
          {isOutOfStock ? "Currently unavailable" : `${product.stock} pieces left`}
        </p>

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
      </div>
    </div>
  );
}
