"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { getDeliveryCharge } from "@/lib/delivery";
import { cn } from "@/lib/utils";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { useState } from "react";

const checkoutSchema = z
  .object({
    fullName: z.string().min(2, { message: "Please enter your full name" }),
    phone: z.string().min(10, { message: "Please enter a valid phone number" }),
    area: z.string().min(2, { message: "Please enter your area" }),
    street: z.string().min(2, { message: "Please enter your street name" }),
    address: z.string().min(10, { message: "Please enter your full address" }),
    city: z.string().min(2, { message: "Please enter your city" }),
    paymentMethod: z.enum(["cod", "bank", "easypaisa", "jazzcash", "stripe"], {
      message: "Please select a payment method",
    }),
    transactionId: z.string().optional(),
    paymentReceiptUrl: z.string().optional(),
  })
  .refine(
    (data) => {
      // Transaction ID is now optional for all manual-verification methods,
      // since the receipt upload is the primary proof. No hard requirement here.
      return true;
    },
    {
      message: "Please enter your transaction ID",
      path: ["transactionId"],
    }
  );

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "cod" },
  });

  const selectedCity = useWatch({ control, name: "city" });
  const deliveryCharge = getDeliveryCharge(selectedCity || "");

  const selectedPaymentMethod = useWatch({ control, name: "paymentMethod" });
  const needsManualVerification =
    selectedPaymentMethod === "easypaisa" ||
    selectedPaymentMethod === "jazzcash" ||
    selectedPaymentMethod === "bank";

  const paymentReceiptUrl = useWatch({ control, name: "paymentReceiptUrl" });
  const grandTotal = subtotal + deliveryCharge;
  const [isUploadingReceipt, setIsUploadingReceipt] = useState(false);

  async function handleReceiptUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingReceipt(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setValue("paymentReceiptUrl", url);
    } catch {
      alert("Receipt upload failed. Please try again.");
    } finally {
      setIsUploadingReceipt(false);
    }
  }

  async function onSubmit(data: CheckoutFormValues) {
    if (data.paymentMethod === "stripe") {
      try {
        const response = await fetch("/api/checkout/stripe-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: data.fullName,
            phone: data.phone,
            address: data.address,
            city: data.city,
            items: items.map((item) => ({
              productId: item.product.id,
              productName: item.product.name,
              price: item.product.discountPrice ?? item.product.price,
              quantity: item.quantity,
            })),
            subtotal,
            deliveryCharge,
          }),
        });

        if (!response.ok) {
          alert("Could not start payment. Please try again.");
          return;
        }

        const { url } = await response.json();

        if (url) {
          window.location.assign(url);
        }

        return;
      } catch {
        alert("Could not connect to the payment server.");
        return;
      }
    }

    const orderPayload = {
      fullName: data.fullName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      paymentMethod: data.paymentMethod,
      transactionId: data.transactionId,
      paymentReceiptUrl: data.paymentReceiptUrl,
      subtotal,
      deliveryCharge,
      items: items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.discountPrice ?? item.product.price,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Something went wrong. Please try again.");
        return;
      }

      const result = await response.json();

      clearCart();
      router.push(`/order-confirmation/${result.order.orderNumber}`);
    } catch (error) {
      console.error("Network error placing order:", error);
      alert("Could not connect to the server. Please check your internet and try again.");
    }
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-luxury-black px-6 pt-32 pb-24 text-center">
        <h1 className="text-2xl font-bold text-luxury-white">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Add something to your cart before checking out.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-luxury-black pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <h1 className="mb-10 text-3xl font-bold text-luxury-white md:text-4xl">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid grid-cols-1 gap-10 lg:grid-cols-3"
        >
          {/* Left: shipping + payment */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            {/* Shipping info */}
            <div className="rounded-2xl bg-neutral-900 p-6">
              <h2 className="text-lg font-semibold text-luxury-white">
                Shipping Information
              </h2>
              <div className="mt-5 flex flex-col gap-4">
                <div>
                  <input
                    {...register("fullName")}
                    type="text"
                    placeholder="Full Name"
                    className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-sm text-luxury-white focus:border-luxury-gold focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-xs text-red-500">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="Phone Number (e.g. 03001234567)"
                    className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-sm text-luxury-white focus:border-luxury-gold focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-xs text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register("area")}
                    type="text"
                    placeholder="Area (e.g. Gulshan-e-Iqbal, DHA Phase 5)"
                    className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-sm text-luxury-white focus:border-luxury-gold focus:outline-none"
                  />
                  {errors.area && (
                    <p className="mt-2 text-xs text-red-500">{errors.area.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register("street")}
                    type="text"
                    placeholder="Street Name / House No."
                    className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-sm text-luxury-white focus:border-luxury-gold focus:outline-none"
                  />
                  {errors.street && (
                    <p className="mt-2 text-xs text-red-500">{errors.street.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register("address")}
                    type="text"
                    placeholder="Street Address"
                    className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-sm text-luxury-white focus:border-luxury-gold focus:outline-none"
                  />
                  {errors.address && (
                    <p className="mt-2 text-xs text-red-500">{errors.address.message}</p>
                  )}
                </div>

                <div>
                  <select
                    {...register("city")}
                    defaultValue=""
                    className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-sm text-luxury-white focus:border-luxury-gold focus:outline-none"
                  >
                    <option value="" disabled>
                      Select your city
                    </option>
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Abbottabad">Abbottabad</option>
                  </select>
                  {errors.city && (
                    <p className="mt-2 text-xs text-red-500">{errors.city.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="rounded-2xl bg-neutral-900 p-6">
              <h2 className="text-lg font-semibold text-luxury-white">
                Payment Method
              </h2>
              <div className="mt-5 flex flex-col gap-3">
                {[
                  { value: "cod", label: "Cash on Delivery", disabled: false },
                  { value: "bank", label: "Bank Transfer", disabled: false },
                  { value: "easypaisa", label: "EasyPaisa", disabled: false },
                  { value: "jazzcash", label: "JazzCash", disabled: false },
                  { value: "stripe", label: "Pay with Card (Stripe)", disabled: true },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-neutral-800 p-4 text-sm text-luxury-white has-[:checked]:border-luxury-gold",
                      method.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        {...register("paymentMethod")}
                        type="radio"
                        value={method.value}
                        disabled={method.disabled}
                        className="accent-luxury-gold"
                      />
                      {method.label}
                    </span>
                    {method.disabled && (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] tracking-wide text-gray-400 uppercase">
                        Coming Soon
                      </span>
                    )}
                  </label>
                ))}
              </div>

              {needsManualVerification && (
                <div className="mt-5 rounded-xl border border-luxury-gold/30 bg-luxury-gold/5 p-4">
                  <p className="text-xs text-gray-400">
                    {selectedPaymentMethod === "bank"
                      ? "Please transfer the total amount to our bank account (details will be shown after order confirmation)."
                      : `Please send the total amount to our ${selectedPaymentMethod === "easypaisa" ? "EasyPaisa" : "JazzCash"} account (details will be shown after order confirmation).`}
                  </p>

                  <input
                    {...register("transactionId")}
                    type="text"
                    placeholder="Transaction ID (optional)"
                    className="mt-3 w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-sm text-luxury-white focus:border-luxury-gold focus:outline-none"
                  />
                  {errors.transactionId && (
                    <p className="mt-2 text-xs text-red-500">{errors.transactionId.message}</p>
                  )}

                  <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-neutral-900 p-5 text-center hover:border-luxury-gold">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleReceiptUpload}
                    />
                    {isUploadingReceipt ? (
                      <span className="text-xs text-gray-400">Uploading...</span>
                    ) : paymentReceiptUrl ? (
                      <span className="text-xs text-luxury-gold">✓ Receipt uploaded — tap to replace</span>
                    ) : (
                      <span className="text-xs text-gray-500">Upload Payment Receipt Screenshot</span>
                    )}
                  </label>

                  <p className="mt-3 text-xs text-luxury-gold">
                    Once your payment is cleared, only then will your parcel be dispatched.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: order summary */}
          <div className="h-fit rounded-2xl bg-neutral-900 p-6">
            <h2 className="text-lg font-semibold text-luxury-white">
              Order Summary
            </h2>

            <div className="mt-5 flex flex-col gap-3 border-b border-white/10 pb-5">
              {items.map((item) => {
                const price = item.product.discountPrice ?? item.product.price;
                return (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-luxury-white">
                      Rs. {(price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-col gap-3 border-b border-white/10 pb-5 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery</span>
                <span>
                  {selectedCity ? `Rs. ${deliveryCharge.toLocaleString()}` : "Select city to calculate"}
                </span>
              </div>
            </div>

            <div className="mt-5 flex justify-between text-base font-semibold text-luxury-white">
              <span>Total</span>
              <span className="text-luxury-gold">
                Rs. {grandTotal.toLocaleString()}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-full bg-luxury-gold py-3 text-sm font-semibold text-luxury-black transition-colors hover:bg-luxury-gold-light disabled:opacity-60"
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
