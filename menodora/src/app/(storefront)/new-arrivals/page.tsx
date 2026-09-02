import { prisma } from "@/lib/prisma";
import { ProductCard, type Product } from "@/components/ui/ProductCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Arrivals | Menodora Digital Printed Rida Fabrics",
  description: "Explore our latest premium digital printed Rida fabric designs, freshly added to the Menodora collection.",
};

export const revalidate = 0;

export default async function NewArrivalsPage() {
  const twentyDaysAgo = new Date();
  twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

  const dbProducts = await prisma.product.findMany({
    where: {
      createdAt: { gte: twentyDaysAgo },
    },
    orderBy: { createdAt: "desc" },
  });

  const products: Product[] = dbProducts.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    discountPrice: p.discountPrice ?? undefined,
    stock: p.stock,
    image1: p.image1,
  }));

  return (
    <main className="min-h-screen bg-luxury-black pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm tracking-[0.3em] text-luxury-gold uppercase">
            Just In
          </p>
          <h1 className="text-4xl font-bold text-luxury-white md:text-5xl">
            New Arrivals
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            Our latest fabric designs, freshly added.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-gray-500">
            No new arrivals in the last 20 days — check back soon.
          </p>
        )}
      </div>
    </main>
  );
}