"use client";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  category: z.string().min(2, { message: "Category is required" }),
  price: z.number().positive({ message: "Price must be greater than 0" }),
  discountPrice: z
    .number()
    .positive({ message: "Sale price must be greater than 0" })
    .optional()
    .or(z.nan().transform(() => undefined)),
  stock: z.number().int().min(0, { message: "Stock cannot be negative" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  careInstructions: z.string().min(5, { message: "Care instructions are required" }),
  image1: z.string().optional(),
  image2: z.string().optional(),
  image3: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

type ProductFormProps = {
  mode: "create" | "edit";
  productId?: string;
  defaultValues?: Partial<ProductFormValues>;
};

export function ProductForm({ mode, productId, defaultValues }: ProductFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
  register,
  handleSubmit,
  setValue,
  control,
  formState: { errors, isSubmitting },
} = useForm<ProductFormValues>({
  resolver: zodResolver(productSchema),
  defaultValues,
});

const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);
const image1 = useWatch({ control, name: "image1" });
const image2 = useWatch({ control, name: "image2" });
const image3 = useWatch({ control, name: "image3" });

async function handleImageUpload(
  e: React.ChangeEvent<HTMLInputElement>,
  slot: 1 | 2 | 3
) {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploadingSlot(slot);
  try {
    const url = await uploadImageToCloudinary(file);
    setValue(`image${slot}` as "image1" | "image2" | "image3", url);
  } catch {
    alert("Image upload failed. Please try again.");
  } finally {
    setUploadingSlot(null);
  }
}

  async function onSubmit(data: ProductFormValues) {
    setServerError(null);

    const url =
      mode === "create"
        ? "/api/admin/products"
        : `/api/admin/products/${productId}`;

    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setServerError(errorData.error || "Something went wrong.");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setServerError("Could not connect to the server.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div>
        <label className="text-sm text-gray-400">Product Name</label>
        <input
          {...register("name")}
          type="text"
          className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-gray-400">Category</label>
        <input
          {...register("category")}
          type="text"
          placeholder="e.g. Cotton, Lawn, Mixed Fabric"
          className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none"
        />
        {errors.category && (
          <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label className="text-sm text-gray-400">Price (Rs.)</label>
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none"
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-400">Sale Price (optional)</label>
          <input
            {...register("discountPrice", { valueAsNumber: true })}
            type="number"
            className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Stock</label>
          <input
            {...register("stock", { valueAsNumber: true })}
            type="number"
            className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none"
          />
          {errors.stock && (
            <p className="mt-1 text-xs text-red-500">{errors.stock.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-400">Description</label>
        <textarea
          {...register("description")}
          rows={4}
          className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none"
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-gray-400">Care Instructions</label>
        <textarea
          {...register("careInstructions")}
          rows={2}
          className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none"
        />
        {errors.careInstructions && (
          <p className="mt-1 text-xs text-red-500">{errors.careInstructions.message}</p>
        )}
      </div>

      <div>
  <label className="text-sm text-gray-400">Product Images (up to 3)</label>
  <div className="mt-2 grid grid-cols-3 gap-4">
    {[1, 2, 3].map((slot) => {
      const currentUrl =
        slot === 1 ? image1 : slot === 2 ? image2 : image3;
      const isUploading = uploadingSlot === slot;

      return (
        <label
          key={slot}
          className="relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-neutral-950 hover:border-luxury-gold"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, slot as 1 | 2 | 3)}
          />
          {isUploading ? (
            <span className="text-xs text-gray-400">Uploading...</span>
          ) : currentUrl ? (
            <Image
              src={currentUrl}
              alt={`Product image ${slot}`}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-xs text-gray-500">+ Add Image</span>
          )}
        </label>
      );
    })}
  </div>
</div>

      {serverError && (
        <p className="text-sm text-red-500">{serverError}</p>
      )}
         
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full rounded-xl bg-luxury-gold py-3 text-sm font-semibold text-luxury-black transition-colors hover:bg-luxury-gold-light disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {isSubmitting
          ? "Saving..."
          : mode === "create"
            ? "Create Product"
            : "Save Changes"}
      </button>
    </form>
  );
}