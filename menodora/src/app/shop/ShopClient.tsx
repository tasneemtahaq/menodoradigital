"use client";

import { useState, useMemo } from "react";
import { ProductCard, type Product } from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";

const categoryFilters = ["All", "Cotton", "Lawn", "Mixed Fabric", "Embroidered"];

type SortOption = "default" | "price-asc" | "price-desc";

export function ShopClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const visibleProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== "All") {
      result = result.filter((product) => product.category === activeCategory);
    }

    if (sortOption === "price-asc") {
      result = [...result].sort((a, b) => {
        const priceA = a.discountPrice ?? a.price;
        const priceB = b.discountPrice ?? b.price;
        return priceA - priceB;
      });
    } else if (sortOption === "price-desc") {
      result = [...result].sort((a, b) => {
        const priceA = a.discountPrice ?? a.price;
        const priceB = b.discountPrice ?? b.price;
        return priceB - priceA;
      });
    }

    return result;
  }, [products, activeCategory, sortOption]);

  return (
    <main className="min-h-screen bg-luxury-black pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm tracking-[0.3em] text-luxury-gold uppercase">
            Full Range
          </p>
          <h1 className="text-4xl font-bold text-luxury-white md:text-5xl">
            Shop All Fabrics
          </h1>
        </div>

        <div className="mb-10 flex flex-col items-center justify-between gap-6 border-b border-white/10 pb-6 sm:flex-row">
          <div className="flex flex-wrap justify-center gap-2">
            {categoryFilters.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  activeCategory === category
                    ? "bg-luxury-gold text-luxury-black"
                    : "bg-neutral-900 text-gray-300 hover:bg-neutral-800"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="rounded-full border border-white/10 bg-neutral-900 px-4 py-2 text-sm text-gray-300 focus:border-luxury-gold focus:outline-none"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <p className="mb-6 text-sm text-gray-500">
          {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} found
        </p>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-gray-500">
            No products found in this category.
          </p>
        )}
      </div>
    </main>
  );
}