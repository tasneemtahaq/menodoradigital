"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { categoryTree, mainCategories } from "@/lib/categories";

const productSchema = z
  .object({
    name: z.string().min(2, { message: "Name is required" }),
    category: z.string().min(2, { message: "Please choose a category" }),
    subCategory: z.string().optional(),
    sizes: z.array(z.string()).optional(),
    price: z.number().positive({ message: "Price must be greater than 0" }),
    discountPrice: z
      .number()
      .positive({ message: "Sale price must be greater than 0" })
      .optional()
      .or(z.nan().transform(() => undefined)),
    stock: z.number().int().min(0, { message: "Stock cannot be negative" }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters" }),
    details: z.string().optional(),
    careInstructions: z
      .string()
      .min(5, { message: "Care instructions are required" }),
    image1: z.string().optional(),
    image2: z.string().optional(),
    image3: z.string().optional(),
  })
  .refine(
    (d) =>
      !!d.subCategory &&
      (categoryTree[d.category] ?? []).includes(d.subCategory),
    { message: "Please choose a sub-category", path: ["subCategory"] }
  )
  .refine(
    (d) => d.subCategory !== "Bangles" || !!(d.sizes && d.sizes.length > 0),
    { message: "Select at least one bangle size", path: ["sizes"] }
  );

export type ProductFormValues = z.infer<typeof productSchema>;

type ProductFormProps = {
  mode: "create" | "edit";
  productId?: string;
  defaultValues?: Partial<ProductFormValues>;
};

const BANGLE_SIZES = ["2.2", "2.4", "2.6", "2.8"];

const inputClasses =
  "mt-1 w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none";

export function ProductForm({ mode, productId, defaultValues }: ProductFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { sizes: [], ...defaultValues },
  });

  const image1 = useWatch({ control, name: "image1" });
  const image2 = useWatch({ control, name: "image2" });
  const image3 = useWatch({ control, name: "image3" });
  const selectedCategory = useWatch({ control, name: "category" });
  const selectedSubCategory = useWatch({ control, name: "subCategory" });

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

  function handleImageRemove(slot: 1 | 2 | 3) {
    setValue(`image${slot}` as "image1" | "image2" | "image3", "");
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      {/* Name */}
      <div>
        <label className="text-sm text-gray-400">Product Name</label>
        <input {...register("name")} type="text" className={inputClasses} />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Main category */}
      <div>
        <label className="text-sm text-gray-400">Main Category</label>
        <select
          {...register("category", {
            onChange: () => setValue("subCategory", ""),
          })}
          defaultValue=""
          className={inputClasses}
        >
          <option value="" disabled>
            Select a main category
          </option>
          {mainCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
        )}
      </div>

      {/* Sub-category */}
      {selectedCategory && categoryTree[selectedCategory] && (
        <div>
          <label className="text-sm text-gray-400">Sub-category</label>
          <select
            {...register("subCategory")}
            defaultValue=""
            className={inputClasses}
          >
            <option value="" disabled>
              Choose a sub-category
            </option>
            {categoryTree[selectedCategory].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
          {errors.subCategory && (
            <p className="mt-1 text-xs text-red-500">
              {errors.subCategory.message}
            </p>
          )}
        </div>
      )}

      {/* Bangle sizes (only for Bangles) */}
      {selectedSubCategory === "Bangles" && (
        <div>
          <label className="text-sm text-gray-400">Available Sizes</label>
          <div className="mt-2 flex flex-wrap gap-3">
            {BANGLE_SIZES.map((size) => (
              <label
                key={size}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-neutral-950 px-4 py-2 text-sm text-white has-[:checked]:border-luxury-gold"
              >
                <input
                  type="checkbox"
                  value={size}
                  {...register("sizes")}
                  className="accent-luxury-gold"
                />
                {size}
              </label>
            ))}
          </div>
          {errors.sizes && (
            <p className="mt-1 text-xs text-red-500">{errors.sizes.message}</p>
          )}
        </div>
      )}

      {/* Price / sale price / stock */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label className="text-sm text-gray-400">Price (Rs.)</label>
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            className={inputClasses}
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
            className={inputClasses}
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Stock</label>
          <input
            {...register("stock", { valueAsNumber: true })}
            type="number"
            className={inputClasses}
          />
          {errors.stock && (
            <p className="mt-1 text-xs text-red-500">{errors.stock.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-sm text-gray-400">Description</label>
        <textarea
          {...register("description")}
          rows={4}
          className={inputClasses}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Product details */}
      <div>
        <label className="text-sm text-gray-400">
          Product Details (optional)
        </label>
        <textarea
          {...register("details")}
          rows={5}
          placeholder="Materials, measurements, what's in the box, styling tips..."
          className={inputClasses}
        />
      </div>

      {/* Care instructions */}
      <div>
        <label className="text-sm text-gray-400">Care Instructions</label>
        <textarea
          {...register("careInstructions")}
          rows={2}
          className={inputClasses}
        />
        {errors.careInstructions && (
          <p className="mt-1 text-xs text-red-500">
            {errors.careInstructions.message}
          </p>
        )}
      </div>

      {/* Images */}
      <div>
        <label className="text-sm text-gray-400">Product Images (up to 3)</label>
        <div className="mt-2 grid grid-cols-3 gap-4">
          {[1, 2, 3].map((slot) => {
            const currentUrl = slot === 1 ? image1 : slot === 2 ? image2 : image3;
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
                  <>
                    <Image
                      src={currentUrl}
                      alt={`Product image ${slot}`}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                    <span className="absolute right-0 bottom-0 left-0 bg-black/60 py-1 text-center text-[10px] text-white">
                      Click to replace
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleImageRemove(slot as 1 | 2 | 3);
                      }}
                      aria-label={`Remove image ${slot}`}
                      className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-sm text-white hover:bg-red-600"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-gray-500">+ Add Image</span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {serverError && <p className="text-sm text-red-500">{serverError}</p>}

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