"use client";

import { useState, useMemo } from "react";
import { ProductCard, type Product } from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { categoryTree, mainCategories } from "@/lib/categories";
import Link from "next/link";



type SortOption = "default" | "price-asc" | "price-desc";

export function ShopClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
 const categoryFromUrl = searchParams.get("category");
const subFromUrl = searchParams.get("sub");
const searchTerm = searchParams.get("search");
const validCategory =
  categoryFromUrl && categoryTree[categoryFromUrl]
    ? categoryFromUrl
    : searchTerm
      ? "All"
      : mainCategories[0];
const [activeCategory, setActiveCategory] = useState(validCategory);
const [activeSub, setActiveSub] = useState(
  validCategory !== "All" && subFromUrl ? subFromUrl : "All"
);
  
 
  const searchFromUrl = searchParams.get("search") || "";
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const visibleProducts = useMemo(() => {
  let result = products;

  if (!searchFromUrl && activeCategory !== "All") {
  result = result.filter((product) => product.category === activeCategory);
}

if (!searchFromUrl && activeSub !== "All") {
  result = result.filter((product) => product.subCategory === activeSub);
}

  if (searchFromUrl) {
    result = result.filter((product) =>
      product.name.toLowerCase().includes(searchFromUrl.toLowerCase())
    );
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
  }, [products, activeCategory, sortOption, searchFromUrl]);

  const pillClass = (isActive: boolean) =>
  cn(
    "rounded-full px-4 py-2 text-sm transition-colors",
    isActive
      ? "bg-gold-gradient text-luxury-black"
      : "bg-white/60 text-luxury-text/80 hover:bg-luxury-sand"
  );

  return (
    <main className="min-h-screen bg-transparent pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm tracking-[0.3em] text-luxury-gold-dark uppercase">
            Full Range
          </p>
          <h1 className="text-4xl font-bold text-luxury-text md:text-5xl">
            Shop All Fabrics
          </h1>
        </div>

        <div className="mb-10 flex flex-col items-center justify-between gap-6 border-b border-luxury-tan/40 pb-6 sm:flex-row">
          {searchFromUrl ? (
  <p className="text-sm text-luxury-text/70">
    Showing results for &quot;{searchFromUrl}&quot; —{" "}
    <Link href="/shop" className="text-luxury-gold-dark hover:underline">
      clear search
    </Link>
  </p>
) : (
  <div className="flex flex-col items-center gap-3">
    <div className="flex flex-wrap justify-center gap-2">
      {mainCategories.map((category) => (
        <button
          key={category}
          onClick={() => {
            setActiveCategory(category);
            setActiveSub("All");
          }}
          className={pillClass(activeCategory === category)}
        >
          {category}
        </button>
      ))}
    </div>

    {activeCategory !== "All" && (
      <div className="flex flex-wrap justify-center gap-2">
        {["All", ...categoryTree[activeCategory]].map((sub) => (
          <button
            key={sub}
            onClick={() => setActiveSub(sub)}
            className={pillClass(activeSub === sub)}
          >
            {sub === "All" ? `All ${activeCategory}` : sub}
          </button>
        ))}
      </div>
    )}
  </div>
)}

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="rounded-full border border-luxury-tan/40 bg-white-60 px-4 py-2 text-sm text-luxury-text/80 focus:border-luxury-gold focus:outline-none"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <p className="mb-6 text-sm text-luxury-text/60">
          {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} found
        </p>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-luxury-text/60">
            No products found in this category.
          </p>
        )}
      </div>
    </main>
  );
}