import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderNotification } from "@/lib/discord";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (!metadata) {
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const items: { productId: string; productName: string; price: number; quantity: number }[] =
      JSON.parse(metadata.items);

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryCharge = Number(metadata.deliveryCharge || 0);
    const orderNumber = `MNO-${Date.now()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        fullName: metadata.fullName,
        phone: metadata.phone,
        address: metadata.address,
        city: metadata.city,
        paymentMethod: "stripe",
        status: "confirmed",
        subtotal,
        deliveryCharge,
        grandTotal: subtotal + deliveryCharge,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    await sendOrderNotification({
      orderNumber: order.orderNumber,
      fullName: order.fullName,
      phone: order.phone,
      address: order.address,
      city: order.city,
      paymentMethod: order.paymentMethod,
      transactionId: null,
      items: order.items,
      grandTotal: order.grandTotal,
    });
  }

  return NextResponse.json({ received: true });
}