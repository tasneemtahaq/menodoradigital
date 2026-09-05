"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function ToggleCouponButton({
  couponId,
  isActive,
}: {
  couponId: string;
  isActive: boolean;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleToggle() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/coupons/${couponId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (!response.ok) {
        alert("Failed to update coupon.");
        return;
      }

      router.refresh();
    } catch {
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        "rounded-full px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50",
        isActive
          ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
          : "bg-neutral-700 text-gray-400 hover:bg-neutral-600"
      )}
    >
      {isActive ? "Active" : "Inactive"}
    </button>
  );
}