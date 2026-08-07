import { NextResponse } from "next/server";
import { verifyUserSession } from "@/lib/session";

export async function GET() {
  const userId = await verifyUserSession();
  return NextResponse.json({ loggedIn: !!userId });
}