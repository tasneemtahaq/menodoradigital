"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "@/components/ui/ProductCard";

export type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// A cart line is identified by the product AND its size
function isSameLine(item: CartItem, productId: string, size?: string) {
  return item.product.id === productId && (item.size ?? null) === (size ?? null);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(product: Product, quantity: number, size?: string) {
    setItems((prevItems) => {
      // Stock is shared across sizes, so count every size of this product
      const alreadyInCart = prevItems
        .filter((item) => item.product.id === product.id)
        .reduce((sum, item) => sum + item.quantity, 0);

      const room = product.stock - alreadyInCart;
      if (room <= 0) return prevItems;

      const amount = Math.min(quantity, room);

      const existingItem = prevItems.find((item) =>
        isSameLine(item, product.id, size)
      );

      if (existingItem) {
        return prevItems.map((item) =>
          isSameLine(item, product.id, size)
            ? { ...item, quantity: item.quantity + amount }
            : item
        );
      }

      return [...prevItems, { product, quantity: amount, size }];
    });
  }

  function removeFromCart(productId: string, size?: string) {
    setItems((prevItems) =>
      prevItems.filter((item) => !isSameLine(item, productId, size))
    );
  }

  function updateQuantity(productId: string, quantity: number, size?: string) {
    if (quantity < 1) return;

    setItems((prevItems) => {
      const line = prevItems.find((item) => isSameLine(item, productId, size));
      if (!line) return prevItems;

      const inOtherSizes = prevItems
        .filter(
          (item) =>
            item.product.id === productId && !isSameLine(item, productId, size)
        )
        .reduce((sum, item) => sum + item.quantity, 0);

      const allowed = Math.min(quantity, line.product.stock - inOtherSizes);
      if (allowed < 1) return prevItems;

      return prevItems.map((item) =>
        isSameLine(item, productId, size) ? { ...item, quantity: allowed } : item
      );
    });
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discountPrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}