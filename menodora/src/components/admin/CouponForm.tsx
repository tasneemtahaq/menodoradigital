"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const couponSchema = z.object({
  code: z.string().min(3, { message: "Code must be at least 3 characters" }),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.number().positive({ message: "Must be greater than 0" }),
  minOrderAmount: z.number().min(0).optional(),
  maxUses: z
    .number()
    .positive()
    .optional()
    .or(z.nan().transform(() => undefined)),
  expiresAt: z.string().optional(),
});

type CouponFormValues = z.infer<typeof couponSchema>;

export function CouponForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: { discountType: "percentage", minOrderAmount: 0 },
  });

  async function onSubmit(data: CouponFormValues) {
    setServerError(null);
    try {
      const response = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setServerError(errorData.error || "Something went wrong.");
        return;
      }

      router.push("/admin/coupons");
      router.refresh();
    } catch {
      setServerError("Could not connect to the server.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div>
        <label className="text-sm text-gray-400">Coupon Code</label>
        <input
          {...register("code")}
          type="text"
          placeholder="e.g. EID20"
          className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white uppercase focus:border-luxury-gold focus:outline-none"
        />
        {errors.code && (
          <p className="mt-1 text-xs text-red-500">{errors.code.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-gray-400">Discount Type</label>
        <select
          {...register("discountType")}
          className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none"
        >
          <option value="percentage">Percentage (%)</option>
          <option value="fixed">Fixed Amount (Rs.)</option>
        </select>
      </div>

      <div>
        <label className="text-sm text-gray-400">Discount Value</label>
        <input
          {...register("discountValue", { valueAsNumber: true })}
          type="number"
          placeholder="e.g. 20"
          className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none"
        />
        {errors.discountValue && (
          <p className="mt-1 text-xs text-red-500">{errors.discountValue.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-gray-400">Minimum Order Amount (optional)</label>
        <input
          {...register("minOrderAmount", { valueAsNumber: true })}
          type="number"
          placeholder="0"
          className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">Max Uses (optional)</label>
        <input
          {...register("maxUses", { valueAsNumber: true })}
          type="number"
          placeholder="Unlimited"
          className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">Expiry Date (optional)</label>
        <input
          {...register("expiresAt")}
          type="date"
          className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none"
        />
      </div>

      {serverError && <p className="text-sm text-red-500">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-xl bg-luxury-gold py-3 text-sm font-semibold text-luxury-black transition-colors hover:bg-luxury-gold-light disabled:opacity-60"
      >
        {isSubmitting ? "Creating..." : "Create Coupon"}
      </button>
    </form>
  );
}