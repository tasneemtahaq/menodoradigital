import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
  data: {
    name: body.name,
    category: body.category,
    price: body.price,
    discountPrice: body.discountPrice || null,
    stock: body.stock,
    description: body.description,
    careInstructions: body.careInstructions,
    image1: body.image1 || null,
    image2: body.image2 || null,
    image3: body.image3 || null,
  },
});

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}