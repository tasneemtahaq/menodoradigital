import { NextResponse } from "next/server";
import { google } from "googleapis";
import { prisma } from "@/lib/prisma";
import { createUserSession } from "@/lib/session";

function getGoogleClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback`
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login?error=google`);
  }

  try {
    const client = getGoogleClient();
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: client });
    const { data: googleProfile } = await oauth2.userinfo.get();

    if (!googleProfile.email || !googleProfile.id) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login?error=google`);
    }

    let user = await prisma.user.findUnique({
      where: { email: googleProfile.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          fullName: googleProfile.name || "Menodora Customer",
          email: googleProfile.email,
          googleId: googleProfile.id,
        },
      });
    } else if (!user.googleId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId: googleProfile.id },
      });
    }

    await createUserSession(user.id);

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/account`);
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login?error=google`);
  }
}