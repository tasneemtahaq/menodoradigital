"use client"

import "./globals.css";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <html lang="en">
      <body>
        <WishlistProvider>
          <CartProvider>
            {!isAdminRoute && <Navbar />}
              {children}
            {!isAdminRoute && <Footer />}
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}