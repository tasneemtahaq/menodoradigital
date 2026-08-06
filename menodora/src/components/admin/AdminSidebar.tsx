"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
];


export function AdminSidebar() {
  const pathname = usePathname();

  const router = useRouter();

async function handleLogout() {
  await fetch("/api/admin/logout", { method: "POST" });
  router.push("/admin-login");
  router.refresh();
}

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-white/10 bg-neutral-950 p-6">
      <Link href="/admin" className="text-xl font-bold tracking-wide text-luxury-gold">
        MENODORA
      </Link>
      <p className="mt-1 text-xs text-gray-500">Admin Panel</p>

      <nav className="mt-10 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors",
                isActive
                  ? "bg-luxury-gold/10 text-luxury-gold"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <Link
          href="/"
          className="block rounded-xl px-4 py-3 text-sm text-gray-500 hover:text-white"
        >
          ← Back to Store
        </Link>
        <button
         onClick={handleLogout}
         className="mt-2 block w-full rounded-xl px-4 py-3 text-left text-sm text-gray-500 hover:text-white"
        >
           Logout
       </button>
      </div>
    </aside>
  );
}