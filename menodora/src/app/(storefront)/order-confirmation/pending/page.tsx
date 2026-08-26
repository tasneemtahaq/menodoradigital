"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

function PendingConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"checking" | "found" | "timeout">(
    sessionId ? "checking" : "timeout"
  );

  useEffect(() => {
    if (!sessionId) return;

    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      const response = await fetch(`/api/checkout/stripe-session-status?session_id=${sessionId}`);
      const data = await response.json();

      if (data.orderNumber) {
        clearInterval(interval);
        router.push(`/order-confirmation/${data.orderNumber}`);
      } else if (attempts >= 10) {
        clearInterval(interval);
        setStatus("timeout");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionId, router]);

  return (
    <>
      {status === "checking" && (
        <>
          <h1 className="mt-6 text-2xl font-bold text-luxury-white">
            Confirming your payment...
          </h1>
          <p className="mt-2 text-sm text-gray-400">This will only take a moment.</p>
        </>
      )}
      {status === "timeout" && (
        <>
          <h1 className="mt-6 text-2xl font-bold text-luxury-white">
            Payment received
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Your order is being processed. Check your email or contact us if you don&apos;t see a confirmation soon.
          </p>
        </>
      )}
    </>
  );
}

export default function PendingConfirmationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-luxury-black px-6 text-center">
      <CheckCircle className="h-14 w-14 text-luxury-gold" />
      <Suspense
        fallback={
          <h1 className="mt-6 text-2xl font-bold text-luxury-white">
            Loading...
          </h1>
        }
      >
        <PendingConfirmationContent />
      </Suspense>
    </main>
  );
}
