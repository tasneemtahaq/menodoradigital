import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add New Product</h1>
      <p className="mt-1 text-sm text-gray-500">
        Fill in the details for your new fabric design.
      </p>

      <div className="mt-8 max-w-2xl">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}