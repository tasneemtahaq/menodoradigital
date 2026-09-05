import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const coupon = await prisma.coupon.create({
      data: {
        code: body.code.toUpperCase().trim(),
        discountType: body.discountType,
        discountValue: body.discountValue,
        minOrderAmount: body.minOrderAmount || 0,
        maxUses: body.maxUses || null,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
      },
    });

    return NextResponse.json({ success: true, coupon }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error && error.message.includes("Unique constraint")
        ? "A coupon with this code already exists"
        : "Failed to create coupon";
    console.error("Create coupon error:", error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}