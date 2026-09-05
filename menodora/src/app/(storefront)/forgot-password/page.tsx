"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.message || "If an account exists, a reset link has been sent.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-luxury-black px-6 pt-32 pb-24">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-neutral-900 p-8"
      >
        <h1 className="text-2xl font-bold text-luxury-white">Forgot Password</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="mt-6 w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-luxury-gold focus:outline-none"
        />

        {message && <p className="mt-4 text-sm text-luxury-gold">{message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-xl bg-luxury-gold py-3 text-sm font-semibold text-luxury-black transition-colors hover:bg-luxury-gold-light disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </main>
  );
}