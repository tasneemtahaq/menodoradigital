import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "./ProductDetailClient";
import type { Metadata } from "next";
import { RelatedProducts } from "@/components/sections/RelatedProducts";
import type { Product } from "@/components/ui/ProductCard";

export const revalidate = 0;



export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return { title: "Product Not Found | Menodora" };
  }
  

  return {
    title: `${product.name} | Menodora Digital Printed Fabrics`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.image1 ? [product.image1] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    notFound();
  }

 const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: product.image1 ? [product.image1, product.image2, product.image3].filter(Boolean) : [],
  offers: {
    "@type": "Offer",
    priceCurrency: "PKR",
    price: product.discountPrice ?? product.price,
    availability:
      product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://menodoradigitals.online" },
    { "@type": "ListItem", position: 2, name: "Shop", item: "https://menodoradigitals.online/shop" },
    { "@type": "ListItem", position: 3, name: product.name, item: `https://menodoradigitals.online/products/${product.id}` },
  ],
};

const relatedDbProducts = await prisma.product.findMany({
  where: {
    category: product.category,
    id: { not: product.id },
  },
  take: 4,
});

const relatedProducts: Product[] = relatedDbProducts.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  discountPrice: p.discountPrice ?? undefined,
  stock: p.stock,
  image1: p.image1,
}));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailClient product={product} />
      <RelatedProducts products={relatedProducts} />
      </>
  );
}

 