import { prisma } from "@/lib/prisma";
import { ProductCard, type Product } from "@/components/ui/ProductCard";

export async function FeaturedProducts() {
  const dbProducts = await prisma.product.findMany({
    take: 4,
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
    <section className="bg-luxury-white px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-2 text-sm tracking-[0.3em] text-luxury-gold uppercase">
            Handpicked
          </p>
          <h2 className="text-3xl font-bold text-luxury-text md:text-4xl">
            Featured Products
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}