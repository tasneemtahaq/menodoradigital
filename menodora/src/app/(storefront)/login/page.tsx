"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Something went wrong.");
        setIsSubmitting(false);
        return;
      }

      router.push("/account");
      router.refresh();
    } catch {
      setError("Could not connect to the server.");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-luxury-black px-6 pt-32 pb-24">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-neutral-900 p-8"
      >
        <h1 className="text-2xl font-bold text-luxury-white">Welcome Back</h1>
        <p className="mt-1 text-sm text-gray-500">Log in to your account.</p>

        <div className="mt-6 flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none"
          />
        </div>
        <div className="text-right">
           <Link href="/forgot-password" className="text-xs text-gray-500 hover:text-luxury-gold">
             Forgot password?
           </Link>
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-xl bg-luxury-gold py-3 text-sm font-semibold text-luxury-black transition-colors hover:bg-luxury-gold-light disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-luxury-gold hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </main>
  );
}