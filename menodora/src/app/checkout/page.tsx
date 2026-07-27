"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";


const DELIVERY_NOTE = "Delivery charges will be calculated based on your location and confirmed by our team.";

const checkoutSchema = z
  .object({
    fullName: z.string().min(2, { message: "Please enter your full name" }),
    phone: z.string().min(10, { message: "Please enter a valid phone number" }),
    address: z.string().min(10, { message: "Please enter your full address" }),
    city: z.string().min(2, { message: "Please enter your city" }),
    paymentMethod: z.enum(["cod", "bank", "easypaisa", "jazzcash"], {
      message: "Please select a payment method",
    }),
    transactionId: z.string().optional(),
  })
  .refine(
    (data) => {
      const needsTransactionId =
        data.paymentMethod === "easypaisa" || data.paymentMethod === "jazzcash";
      if (needsTransactionId) {
        return !!data.transactionId && data.transactionId.length >= 4;
      }
      return true;
    },
    {
      message: "Please enter your transaction ID",
      path: ["transactionId"],
    }
  );

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

// This function lives OUTSIDE the component, at the top level of the file.
// That's what keeps Date.now() away from the React Compiler's purity checks.


export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "cod" },
  });

  const selectedPaymentMethod = useWatch({ control, name: "paymentMethod" });
  const needsTransactionId =
    selectedPaymentMethod === "easypaisa" || selectedPaymentMethod === "jazzcash";
  const grandTotal = subtotal;

  async function onSubmit(data: CheckoutFormValues) {
  const orderPayload = {
    fullName: data.fullName,
    phone: data.phone,
    address: data.address,
    city: data.city,
    paymentMethod: data.paymentMethod,
    transactionId: data.transactionId,
    subtotal,
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
                  <input
                    {...register("city")}
                    type="text"
                    placeholder="City"
                    className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-sm text-luxury-white focus:border-luxury-gold focus:outline-none"
                  />
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
                  { value: "cod", label: "Cash on Delivery" },
                  { value: "bank", label: "Bank Transfer" },
                  { value: "easypaisa", label: "EasyPaisa" },
                  { value: "jazzcash", label: "JazzCash" },
                ].map((method) => (
                  <label
                    key={method.value}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-neutral-800 p-4 text-sm text-luxury-white has-checked:border-luxury-gold"
                  >
                    <input
                      {...register("paymentMethod")}
                      type="radio"
                      value={method.value}
                      className="accent-luxury-gold"
                    />
                    {method.label}
                  </label>
                ))}
              </div>

              {needsTransactionId && (
                <div className="mt-5 rounded-xl border border-luxury-gold/30 bg-luxury-gold/5 p-4">
                  <p className="text-xs text-gray-400">
                    Please send the total amount to our {selectedPaymentMethod === "easypaisa" ? "EasyPaisa" : "JazzCash"} account
                    (details will be shown after order confirmation), then enter your transaction ID below.
                  </p>
                  <input
                    {...register("transactionId")}
                    type="text"
                    placeholder="Transaction ID"
                    className="mt-3 w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-sm text-luxury-white focus:border-luxury-gold focus:outline-none"
                  />
                  {errors.transactionId && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.transactionId.message}
                    </p>
                  )}
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
              <p className="text-xs text-gray-500">{DELIVERY_NOTE}</p>
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
