
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type WishlistContextType = {
  productIds: string[];
  isLoading: boolean;
  toggleWishlist: (
    productId: string
  ) => Promise<{ requiresLogin: boolean }>;
  refreshWishlist: () => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [productIds, setProductIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Used when you want to manually refresh the wishlist
  async function refreshWishlist() {
    try {
      const response = await fetch("/api/wishlist/status");

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      const data: { productIds: string[] } = await response.json();

      setProductIds(data.productIds);
    } catch {
      setProductIds([]);
    } finally {
      setIsLoading(false);
    }
  }

  // Initial wishlist loading
  useEffect(() => {
    let cancelled = false;

    async function loadWishlist() {
      try {
        const response = await fetch("/api/wishlist/status");

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        const data: { productIds: string[] } = await response.json();

        if (!cancelled) {
          setProductIds(data.productIds);
        }
      } catch {
        if (!cancelled) {
          setProductIds([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadWishlist();

    return () => {
      cancelled = true;
    };
  }, []);

  async function toggleWishlist(productId: string) {
    const response = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (response.status === 401) {
      return { requiresLogin: true };
    }

    const data: { wishlisted: boolean } = await response.json();

    setProductIds((prev) =>
      data.wishlisted
        ? [...prev, productId]
        : prev.filter((id) => id !== productId)
    );

    return { requiresLogin: false };
  }

  return (
    <WishlistContext.Provider
      value={{
        productIds,
        isLoading,
        toggleWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (context === undefined) {
    throw new Error(
      "useWishlist must be used within a WishlistProvider"
    );
  }

  return context;
}

