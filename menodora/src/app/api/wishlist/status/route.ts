import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyUserSession } from "@/lib/session";

export async function GET() {
  const userId = await verifyUserSession();
  if (!userId) {
    return NextResponse.json({ productIds: [] });
  }

  const items = await prisma.wishlistItem.findMany({
    where: { userId },
    select: { productId: true },
  });

  return NextResponse.json({ productIds: items.map((i) => i.productId) });
}