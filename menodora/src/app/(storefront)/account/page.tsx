import { prisma } from "@/lib/prisma";
import { verifyUserSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "@/components/account/LogoutButton";
import { ProductCard, type Product } from "@/components/ui/ProductCard";

export const revalidate = 0;

export default async function AccountPage() {
  const userId = await verifyUserSession();

  if (!userId) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    orders: { orderBy: { createdAt: "desc" }, include: { items: true } },
    wishlist: { orderBy: { createdAt: "desc" } },
  },
});

const wishlistProducts = user
  ? await prisma.product.findMany({
      where: { id: { in: user.wishlist.map((w) => w.productId) } },
    })
  : [];

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-transparent px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-luxury-text">
              Hi, {user.fullName.split(" ")[0]}
            </h1>
            <p className="mt-1 text-sm text-luxury-text/70">{user.email}</p>
          </div>
          <LogoutButton />
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-luxury-text">
            Order History
          </h2>

          {user.orders.length === 0 ? (
            <p className="mt-3 text-sm text-luxury-text/60">
              You haven&apos;t placed any orders yet.{" "}
              <Link href="/shop" className="text-luxury-gold-dark hover:underline">
                Start shopping
              </Link>
            </p>
          ) : (
            <div className="mt-4 flex flex-col gap-4">
              {user.orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/order-confirmation/${order.orderNumber}`}
                  className="block rounded-2xl border border-luxury-tan/40 bg-white-60 p-5 transition-colors hover:border-luxury-gold/40"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-luxury-gold-dark">
                        #{order.orderNumber}
                      </p>
                      <p className="mt-1 text-xs text-luxury-text/60">
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""} ·{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-PK", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-luxury-text">
                        Rs. {order.grandTotal.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs text-luxury-text/70 capitalize">
                        {order.status}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="mt-10">
           <h2 className="text-lg font-semibold text-luxury-text">
               Wishlist
           </h2>

            {wishlistProducts.length === 0 ? (
            <p className="mt-3 text-sm text-luxury-text/60">
                  You haven&apos;t saved anything yet.
           </p>
                ) : (
             <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {wishlistProducts.map((p) => {
                         const product: Product = {
                   id: p.id,
                   name: p.name,
                   category: p.category,
                   price: p.price,
                   discountPrice: p.discountPrice ?? undefined,
                   stock: p.stock,
                   image1: p.image1,
                 };
              return <ProductCard key={p.id} product={product} />;
             })}
         </div>
          )}
       </section>
      </div>
    </main>
  );
}