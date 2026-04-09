import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Celebrating 100 Years | Papa Olusola Ajolore",
  description:
    "A tribute website celebrating 100 years of life, legacy, and impact. Share your memories, messages, and moments.",

  openGraph: {
    title: "Celebrating 100 Years | Papa Olusola Ajolore",
    description:
      "Join us in celebrating a remarkable 100-year journey filled with love, legacy, and unforgettable memories.",
    url: "https://your-domain.com",
    siteName: "Papa Olusola Ajolore Tribute",
    images: [
      {
        url: "/og-image.jpg", // put in public/
        width: 1200,
        height: 630,
        alt: "Celebrating 100 Years",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Celebrating 100 Years | Papa Olusola Ajolore",
    description:
      "A tribute to a life well lived. Explore memories and share your own.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
