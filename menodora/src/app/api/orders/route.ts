import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOrderNotification } from "@/lib/discord";
import { verifyUserSession } from "@/lib/session";

type OrderItemInput = {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
};

type OrderRequestBody = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
  transactionId?: string;
  items: OrderItemInput[];
  subtotal: number;
};

export async function POST(request: Request) {
  try {
    const body: OrderRequestBody = await request.json();
    const userId = await verifyUserSession();

    if (!body.fullName || !body.phone || !body.address || !body.items.length) {
      return NextResponse.json(
        { error: "Missing required order information" },
        { status: 400 }
      );
    }

    const orderNumber = `MNO-${Date.now()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: userId || null,
        fullName: body.fullName,
        phone: body.phone,
        address: body.address,
        city: body.city,
        paymentMethod: body.paymentMethod,
        transactionId: body.transactionId || null,
        subtotal: body.subtotal,
        deliveryCharge: 0,
        grandTotal: body.subtotal,
        items: {
          create: body.items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    for (const item of body.items) {
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
  transactionId: order.transactionId,
  items: order.items,
  grandTotal: order.grandTotal,
});

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Something went wrong while placing your order" },
      { status: 500 }
    );
  }
}