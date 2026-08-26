import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ orderNumber: null });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const metadata = session.metadata;

  if (!metadata) {
    return NextResponse.json({ orderNumber: null });
  }

  const order = await prisma.order.findFirst({
    where: {
      fullName: metadata.fullName,
      phone: metadata.phone,
      paymentMethod: "stripe",
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ orderNumber: order?.orderNumber || null });
}