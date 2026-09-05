import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ToggleCouponButton } from "./ToggleCouponButton";

export const revalidate = 0;

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Coupons</h1>
          <p className="mt-1 text-sm text-gray-500">
            {coupons.length} coupon{coupons.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/coupons/new"
          className="flex items-center gap-2 rounded-xl bg-luxury-gold px-4 py-2.5 text-sm font-semibold text-luxury-black transition-colors hover:bg-luxury-gold-light"
        >
          <Plus className="h-4 w-4" />
          New Coupon
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-950 text-gray-400">
            <tr>
              <th className="px-6 py-4 font-medium">Code</th>
              <th className="px-6 py-4 font-medium">Discount</th>
              <th className="px-6 py-4 font-medium">Min. Order</th>
              <th className="px-6 py-4 font-medium">Used</th>
              <th className="px-6 py-4 font-medium">Expires</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="text-gray-300">
                <td className="px-6 py-4 font-mono font-semibold text-luxury-gold">
                  {coupon.code}
                </td>
                <td className="px-6 py-4">
                  {coupon.discountType === "percentage"
                    ? `${coupon.discountValue}% off`
                    : `Rs. ${coupon.discountValue.toLocaleString()} off`}
                </td>
                <td className="px-6 py-4">
                  {coupon.minOrderAmount > 0
                    ? `Rs. ${coupon.minOrderAmount.toLocaleString()}`
                    : "—"}
                </td>
                <td className="px-6 py-4">
                  {coupon.usedCount}
                  {coupon.maxUses ? ` / ${coupon.maxUses}` : ""}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {coupon.expiresAt
                    ? new Date(coupon.expiresAt).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "No expiry"}
                </td>
                <td className="px-6 py-4">
                  <ToggleCouponButton
                    couponId={coupon.id}
                    isActive={coupon.isActive}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}