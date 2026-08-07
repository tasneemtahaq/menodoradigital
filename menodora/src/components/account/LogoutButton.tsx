"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-white/10 px-5 py-2 text-sm text-gray-400 hover:border-luxury-gold hover:text-luxury-gold"
    >
      Logout
    </button>
  );
}