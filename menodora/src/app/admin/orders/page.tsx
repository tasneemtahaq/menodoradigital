import { prisma } from "@/lib/prisma";
import { OrderStatusSelect } from "./OrderStatusSelect";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Orders</h1>
      <p className="mt-1 text-sm text-gray-500">
        {orders.length} order{orders.length !== 1 ? "s" : ""} total
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {orders.length === 0 && (
          <p className="text-sm text-gray-500">No orders yet.</p>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-white/10 bg-neutral-950 p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-luxury-gold">
                  #{order.orderNumber}
                </p>
                <p className="mt-1 text-base font-medium text-white">
                  {order.fullName}
                </p>
                <p className="text-sm text-gray-400">
                  {order.phone} · {order.city}
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-luxury-gold">
                  Rs. {order.grandTotal.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {order.paymentMethod.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm text-gray-400"
                >
                  <span>
                    {item.productName} × {item.quantity}
                  </span>
                  <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <p className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleDateString("en-PK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}