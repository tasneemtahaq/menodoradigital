import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyUserSession } from "@/lib/session";

export async function POST(request: Request) {
  const userId = await verifyUserSession();
  if (!userId) {
    return NextResponse.json({ error: "Please log in to save items" }, { status: 401 });
  }

  const { productId } = await request.json();

  const existing = await prisma.wishlistItem.findUnique({
    where: { userId_productId: { userId, productId } },
  });

  if (existing) {
    await prisma.wishlistItem.delete({ where: { id: existing.id } });
    return NextResponse.json({ wishlisted: false });
  }

  await prisma.wishlistItem.create({ data: { userId, productId } });
  return NextResponse.json({ wishlisted: true });
}