import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "./ProductDetailClient";

export const revalidate = 0;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}