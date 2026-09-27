import { NextResponse } from "next/server";
import { google } from "googleapis";

function getGoogleClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback`
  );
}

export async function GET() {
  const client = getGoogleClient();

  const authUrl = client.generateAuthUrl({
    access_type: "online",
    scope: ["openid", "email", "profile"],
  });

  return NextResponse.redirect(authUrl);
}