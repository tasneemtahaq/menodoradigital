import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { DeleteProductButton } from "./DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            {products.length} product{products.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-xl bg-luxury-gold px-4 py-2.5 text-sm font-semibold text-luxury-black transition-colors hover:bg-luxury-gold-light"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-950 text-gray-400">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Stock</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {products.map((product) => (
              <tr key={product.id} className="text-gray-300">
                <td className="px-6 py-4 font-medium text-white">
                  {product.name}
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">
                  Rs. {product.price.toLocaleString()}
                  {product.discountPrice && (
                    <span className="ml-2 text-xs text-luxury-gold">
                      (Rs. {product.discountPrice.toLocaleString()} sale)
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={
                      product.stock === 0
                        ? "text-red-500"
                        : product.stock <= 1
                          ? "text-yellow-500"
                          : "text-gray-300"
                    }
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-gray-400 hover:text-luxury-gold"
                      aria-label="Edit product"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteProductButton productId={product.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}