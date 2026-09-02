import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminCustomersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      orders: { select: { grandTotal: true } },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Customers</h1>
      <p className="mt-1 text-sm text-gray-500">
        {users.length} registered customer{users.length !== 1 ? "s" : ""}
      </p>

      {users.length === 0 ? (
        <p className="mt-8 text-sm text-gray-500">
          No customers have registered yet.
        </p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-950 text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Orders</th>
                <th className="px-6 py-4 font-medium">Total Spent</th>
                <th className="px-6 py-4 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users.map((user) => {
                const totalSpent = user.orders.reduce(
                  (sum, order) => sum + order.grandTotal,
                  0
                );

                return (
                  <tr key={user.id} className="text-gray-300">
                    <td className="px-6 py-4 font-medium text-white">
                      {user.fullName}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone || "—"}</td>
                    <td className="px-6 py-4">{user.orders.length}</td>
                    <td className="px-6 py-4 text-luxury-gold">
                      Rs. {totalSpent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}