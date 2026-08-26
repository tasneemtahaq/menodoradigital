import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: body.items.map(
        (item: { productName: string; price: number; quantity: number }) => ({
          price_data: {
            currency: "pkr",
            product_data: { name: item.productName },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })
      ),
      metadata: {
        fullName: body.fullName,
        phone: body.phone,
        address: body.address,
        city: body.city,
        items: JSON.stringify(body.items),
        deliveryCharge: String(body.deliveryCharge),
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-confirmation/pending?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    return NextResponse.json(
      { error: "Failed to create payment session" },
      { status: 500 }
    );
  }
}