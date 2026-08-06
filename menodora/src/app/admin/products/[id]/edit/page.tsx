import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit Product</h1>
      <p className="mt-1 text-sm text-gray-500">{product.name}</p>

      <div className="mt-8 max-w-2xl">
        <ProductForm
          mode="edit"
          productId={product.id}
          defaultValues={{
            name: product.name,
            category: product.category,
            price: product.price,
            discountPrice: product.discountPrice ?? undefined,
            stock: product.stock,
            description: product.description,
            careInstructions: product.careInstructions,
          }}
        />
      </div>
    </div>
  );
}