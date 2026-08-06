"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import type { Product as DbProduct } from "@/generated/prisma/client";
import Image from "next/image";


export function ProductDetailClient({ product }: { product: DbProduct }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState(product.image1 || null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const images = [product.image1, product.image2, product.image3].filter(
    (img): img is string => Boolean(img)
  );

  const stock = product.stock;
  const isOutOfStock = product.stock === 0;
  const hasDiscount = product.discountPrice !== null;

  

  function increaseQuantity() {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  

  return (
    <main className="min-h-screen bg-luxury-black pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image gallery placeholder */}
          <div>
  <div
    onClick={() => activeImage && setIsZoomOpen(true)}
    className="relative flex h-125 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-neutral-800 to-neutral-900 cursor-zoom-in"
  >
    {activeImage ? (
      <Image
        src={activeImage}
        alt={product.name}
        fill
        className="object-cover"
      />
    ) : (
      <span className="text-lg tracking-widest text-luxury-gold/30 uppercase">
        {product.name}
      </span>
    )}
  </div>

  {images.length > 1 && (
    <div className="mt-4 flex gap-3">
      {images.map((img, index) => (
        <button
          key={index}
          onClick={() => setActiveImage(img)}
          className={cn(
            "relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-colors",
            activeImage === img ? "border-luxury-gold" : "border-transparent"
          )}
        >
          <Image src={img} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
        </button>
      ))}
    </div>
  )}
</div>

{isZoomOpen && activeImage && (
  <div
    onClick={() => setIsZoomOpen(false)}
    className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-6 cursor-zoom-out"
  >
    <div className="relative h-full max-h-[90vh] w-full max-w-3xl">
      <Image
        src={activeImage}
        alt={product.name}
        fill
        className="object-contain"
      />
    </div>
  </div>
)}

          {/* Product info */}
          <div>
            <p className="text-xs tracking-wide text-gray-400 uppercase">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-luxury-white md:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              {hasDiscount ? (
                <>
                  <span className="text-2xl font-bold text-luxury-gold">
                    Rs. {product.discountPrice?.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    Rs. {product.price.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-luxury-gold">
                  Rs. {product.price.toLocaleString()}
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {isOutOfStock ? "Currently unavailable" : `${product.stock} pieces left`}
            </p>

            <p className="mt-6 text-sm leading-relaxed text-gray-300">
              {product.description}
            </p>

            <div className="mt-6 border-t border-white/10 pt-6">
              <h3 className="text-sm font-semibold tracking-wide text-luxury-white uppercase">
                Care Instructions
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                {product.careInstructions}
              </p>
            </div>

            {/* Quantity selector */}
            {!isOutOfStock && (
              <div className="mt-8 flex items-center gap-4">
                <span className="text-sm text-gray-400">Quantity</span>
                <div className="flex items-center rounded-full border border-white/10">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="flex h-9 w-9 items-center justify-center text-luxury-white disabled:text-gray-600"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm text-luxury-white">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= stock}
                    className="flex h-9 w-9 items-center justify-center text-luxury-white disabled:text-gray-600"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Add to cart */}
            <button
              onClick={() =>
                addToCart(
                  {
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    discountPrice: product.discountPrice ?? undefined,
                    stock: product.stock,
                  },
                  quantity
                )
              }
              disabled={isOutOfStock}
              className={cn(
                "mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-colors sm:w-auto sm:px-12",
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
      </div>
    </main>
  );
}
