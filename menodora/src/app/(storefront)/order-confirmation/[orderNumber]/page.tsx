import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { paymentDetails } from "@/lib/paymentDetails";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true },
  });

  if (!order) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-luxury-black px-6 pt-32 pb-24">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="h-14 w-14 text-luxury-gold" />
          <h1 className="mt-6 text-3xl font-bold text-luxury-white md:text-4xl">
            Thank You, {order.fullName.split(" ")[0]}!
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Your order has been placed successfully.
          </p>
          <p className="mt-4 rounded-full bg-neutral-900 px-5 py-2 text-sm text-luxury-gold">
            Order #{order.orderNumber}
          </p>
        </div>

        <div className="mt-10 rounded-2xl bg-neutral-900 p-6">
          <h2 className="text-lg font-semibold text-luxury-white">
            Order Details
          </h2>

          <div className="mt-5 flex flex-col gap-3 border-b border-white/10 pb-5">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-400">
                  {item.productName} × {item.quantity}
                </span>
                <span className="text-luxury-white">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-4 text-sm">
  <div className="flex justify-between text-gray-400">
    <span>Subtotal</span>
    <span>Rs. {order.subtotal.toLocaleString()}</span>
  </div>
  <div className="flex justify-between text-gray-400">
    <span>Delivery</span>
    <span>Rs. {order.deliveryCharge.toLocaleString()}</span>
  </div>
  <div className="mt-2 flex justify-between text-base font-semibold text-luxury-white">
    <span>Total</span>
    <span className="text-luxury-gold">
      Rs. {order.grandTotal.toLocaleString()}
    </span>
  </div>
</div>
          

          <div className="mt-6 border-t border-white/10 pt-5 text-sm text-gray-400">
            <p>
              <span className="text-gray-500">Shipping to:</span>{" "}
              {order.address}, {order.city}
            </p>
            {(order.paymentMethod === "bank" || order.paymentMethod === "easypaisa" || order.paymentMethod === "jazzcash") && order.status === "pending" && (
           <div className="mt-4 rounded-xl border border-luxury-gold/30 bg-luxury-gold/5 p-4">
             <p className="text-xs text-gray-400">Complete your payment to:</p>
             <p className="mt-2 text-sm text-luxury-gold">
            {order.paymentMethod === "bank" && (
           <>
          {paymentDetails.bank.accountTitle}
           <br />
          {paymentDetails.bank.bankName} — {paymentDetails.bank.accountNumber}
           </>
          )}
            {order.paymentMethod === "easypaisa" && (
           <>
          {paymentDetails.easypaisa.accountTitle}
          <br />
          {paymentDetails.easypaisa.number}
        </>
      )}
      {order.paymentMethod === "jazzcash" && (
        <>
          {paymentDetails.jazzcash.accountTitle}
          <br />
          {paymentDetails.jazzcash.number}
        </>
      )}
    </p>
  </div>
)}
            <p className="mt-1">
              <span className="text-gray-500">Status:</span> {order.status}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="rounded-full bg-luxury-gold px-8 py-3 text-sm font-semibold text-luxury-black transition-colors hover:bg-luxury-gold-light"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}