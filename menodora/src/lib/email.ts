import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  await resend.emails.send({
    from: "Menodora <onboarding@resend.dev>",
    to: email,
    subject: "Reset your Menodora password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #000;">Reset Your Password</h2>
        <p style="color: #444;">We received a request to reset your Menodora account password. Click the button below to choose a new one — this link expires in 1 hour.</p>
        <a href="${resetUrl}" style="display: inline-block; margin-top: 16px; padding: 12px 24px; background-color: #D4AF37; color: #000; text-decoration: none; border-radius: 999px; font-weight: 600;">
          Reset Password
        </a>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}