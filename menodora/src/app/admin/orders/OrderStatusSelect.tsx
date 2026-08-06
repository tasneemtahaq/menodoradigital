"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const statusOptions = [
  "pending",
  "confirmed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

const statusColors: Record<string, string> = {
  pending: "text-yellow-500",
  confirmed: "text-blue-400",
  packed: "text-purple-400",
  shipped: "text-cyan-400",
  delivered: "text-green-500",
  cancelled: "text-red-500",
  refunded: "text-gray-400",
};

export function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleChange(newStatus: string) {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        alert("Failed to update order status.");
        return;
      }

      router.refresh();
    } catch {
      alert("Something went wrong.");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <select
      value={currentStatus}
      disabled={isUpdating}
      onChange={(e) => handleChange(e.target.value)}
      className={cn(
        "rounded-full border border-white/10 bg-neutral-900 px-3 py-1.5 text-xs font-medium capitalize focus:border-luxury-gold focus:outline-none disabled:opacity-50",
        statusColors[currentStatus] || "text-gray-300"
      )}
    >
      {statusOptions.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}