import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Menodora | Digital Printed Rida Fabrics in Pakistan",
  description: "Shop premium digital printed rida fabric prints, designed and crafted in Karachi, Pakistan. Limited pieces, exclusive designs.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
   verification: {
    google:  "jrHcO4WlcQSAuJCo4CzkE4ChMnuyKJPjWkPNqopsIAc" ,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Menodora Digital Printed Rida Fabrics",
  url: "https://www.menodoradigitals.online",
  logo: "https://www.menodoradigitals.online/images/logo.jpg",
  sameAs: ["https://www.instagram.com/menodora_digitalprints"],
  description: "Premium digital printed rida fabrics, designed and crafted in Karachi, Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}