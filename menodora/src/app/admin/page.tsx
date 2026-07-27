import { prisma } from "@/lib/prisma";
import { Package, ShoppingCart, DollarSign } from "lucide-react";

export default async function AdminDashboardPage() {
  const [productCount, orderCount, orders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.findMany({ select: { grandTotal: true } }),
  ]);

  const totalRevenue = orders.reduce((sum, order) => sum + order.grandTotal, 0);

  const stats = [
    { label: "Total Products", value: productCount, icon: Package },
    { label: "Total Orders", value: orderCount, icon: ShoppingCart },
    { label: "Total Revenue", value: `Rs. ${totalRevenue.toLocaleString()}`, icon: DollarSign },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">
        Overview of your store&apos;s performance.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-neutral-950 p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">{stat.label}</p>
                <Icon className="h-5 w-5 text-luxury-gold" />
              </div>
              <p className="mt-3 text-2xl font-bold text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}