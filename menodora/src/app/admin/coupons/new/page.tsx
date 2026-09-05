import { CouponForm } from "@/components/admin/CouponForm";

export default function NewCouponPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">New Coupon</h1>
      <p className="mt-1 text-sm text-gray-500">
        Create a new discount code for your store.
      </p>

      <div className="mt-8 max-w-lg">
        <CouponForm />
      </div>
    </div>
  );
}