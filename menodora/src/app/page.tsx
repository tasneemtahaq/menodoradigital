import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { Categories } from "@/components/sections/Categories";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Reviews } from "@/components/sections/Reviews";

export default function Home() {
  return (
    <main className="min-h-screen pt-20  bg-luxury-black">
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
      <Reviews />
    </main>
  );
}