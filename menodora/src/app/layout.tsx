import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Menodora Digital Printed Fabrics",
  description: "Premium digital printed Rida fabrics — luxury, elegance, and timeless quality, crafted in Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}