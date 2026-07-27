"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";


export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
   const { totalItems } = useCart();

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 z-50 w-full px-6 py-4 transition-colors duration-300 md:px-12",
        isScrolled ? "bg-luxury-black shadow-lg" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide text-luxury-gold">
          MENODORA
        </Link>

        {/* Nav Links - hidden on mobile for now */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/shop" className="text-sm text-luxury-white hover:text-luxury-gold">
            Shop
          </Link>
          <Link href="/categories" className="text-sm text-luxury-white hover:text-luxury-gold">
            Categories
          </Link>
          <Link href="/new-arrivals" className="text-sm text-luxury-white hover:text-luxury-gold">
            New Arrivals
          </Link>
          <Link href="/about" className="text-sm text-luxury-white hover:text-luxury-gold">
            About
          </Link>
          <Link href="/contact" className="text-sm text-luxury-white hover:text-luxury-gold">
            Contact
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <Search className="h-5 w-5 cursor-pointer text-luxury-white hover:text-luxury-gold" />
          <Heart className="h-5 w-5 cursor-pointer text-luxury-white hover:text-luxury-gold" />
          <Link href="/cart" className="relative">
          <ShoppingBag className="h-5 w-5 cursor-pointer text-luxury-white hover:text-luxury-gold" />
              {totalItems > 0 && (
                 <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold text-[10px] font-bold text-luxury-black">
                   {totalItems}
                 </span>
                   )}
            </Link>
          <User className="h-5 w-5 cursor-pointer text-luxury-white hover:text-luxury-gold" />
        </div>
      </div>
    </nav>
  );
}