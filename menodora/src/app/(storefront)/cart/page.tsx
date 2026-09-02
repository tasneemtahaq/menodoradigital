"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";



export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  const isEmpty = items.length === 0;
 

  if (isEmpty) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-luxury-black px-6 pt-32 pb-24 text-center">
        <ShoppingBag className="h-12 w-12 text-gray-600" />
        <h1 className="mt-6 text-2xl font-bold text-luxury-white">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-luxury-gold px-8 py-3 text-sm font-semibold text-luxury-black transition-colors hover:bg-luxury-gold-light"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-luxury-black pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <h1 className="mb-10 text-3xl font-bold text-luxury-white md:text-4xl">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Cart items list */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {items.map((item) => {
              const price = item.product.discountPrice ?? item.product.price;
              const lineTotal = price * item.quantity;

              return (
                <div
                  key={item.product.id}
                  className="flex gap-4 rounded-2xl bg-neutral-900 p-4"
                >
                  {/* Image */}
                <Link
                    href={`/products/${item.product.id}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-linear-to-br from-neutral-800 to-neutral-700"
                >
                {item.product.image1 ? (
                 <Image
                   src={item.product.image1}
                   alt={item.product.name}
                   fill
                   sizes="96px"
                   className="object-cover"
                  />
                  ) : (
                 <div className="flex h-full items-center justify-center">
                 <span className="text-center text-[10px] tracking-widest text-luxury-gold/40 uppercase">
                   {item.product.name}
                 </span>
                </div>
   )}
              </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/products/${item.product.id}`}
                          className="text-sm font-semibold text-luxury-white hover:text-luxury-gold"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-gray-500">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label="Remove item"
                        className="text-gray-500 transition-colors hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center rounded-full border border-white/10">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="flex h-7 w-7 items-center justify-center text-luxury-white disabled:text-gray-600"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs text-luxury-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.product.stock}
                          className="flex h-7 w-7 items-center justify-center text-luxury-white disabled:text-gray-600"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-luxury-gold">
                        Rs. {lineTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            <Link
              href="/shop"
              className="mt-2 text-sm text-luxury-gold hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="h-fit rounded-2xl bg-neutral-900 p-6">
            <h2 className="text-lg font-semibold text-luxury-white">
              Order Summary
            </h2>

            <div className="mt-5 flex flex-col gap-3 border-b border-white/10 pb-5 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500">
                Delivery charges will be calculated based on your location.
             </p>
            </div>

           <div className="mt-5 flex justify-between text-base font-semibold text-luxury-white">
            <span>Subtotal</span>
            <span className="text-luxury-gold">
                 Rs. {subtotal.toLocaleString()}
            </span>
          </div>

            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center rounded-full bg-luxury-gold py-3 text-sm font-semibold text-luxury-black transition-colors hover:bg-luxury-gold-light"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}