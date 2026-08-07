import { prisma } from "@/lib/prisma";
import type { Product } from "@/components/ui/ProductCard";
import { ShopClient } from "./ShopClient";

export const revalidate = 0;

export default async function ShopPage() {
  const dbProducts = await prisma.product.findMany({
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

  return <ShopClient products={products} />;
}