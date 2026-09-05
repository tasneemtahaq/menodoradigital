import { ProductCard, type Product } from "@/components/ui/ProductCard";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto mt-20 max-w-6xl px-6 pb-24 md:px-12">
      <h2 className="text-2xl font-bold text-luxury-white">You May Also Like</h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}