import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { PromoBanner } from "@/components/layout/PromoBanner";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WishlistProvider>
      <CartProvider>
        <Navbar />
        <PromoBanner />
        {children}
        <Footer />
      </CartProvider>
    </WishlistProvider>
  );
}