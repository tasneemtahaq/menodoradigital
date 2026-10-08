import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { PromoBanner } from "@/components/layout/PromoBanner";
import { GoldLeafDecoration } from "@/components/layout/GoldLeafDecoration";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WishlistProvider>
      <CartProvider>
        <div className="gold-dust-bg relative">
          <GoldLeafDecoration />
          <div className="relative z-10">
            <Navbar />
            <PromoBanner />
            {children}
            <Footer />
          </div>
        </div>
      </CartProvider>
    </WishlistProvider>
  );
}