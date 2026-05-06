import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const garamond = localFont({
  src: [
    {
      path: "../public/fonts/garamond/garamond-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/garamond/garamond-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/garamond/garamond-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});

const gotham = localFont({
  src: [
    {
      path: "../public/fonts/gotham/gotham-book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/gotham/gotham-medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Celebrating 100 Years | Pa Olusola Ajolore",
  description:
    "A centennial tribute celebrating the life, legacy, wisdom, and enduring impact of Pa Olusola Ajolore. Explore photographs, memories, voice notes, and heartfelt tributes shared by family and friends across generations.",
  openGraph: {
    title: "Pa Olusola at 100",
    description:
      "Celebrating a century of life, love, family, faith, and legacy.",
    url: "https://your-domain.com",
    siteName: "Pa Olusola Ajolore Tribute",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Celebrating 100 Years of Pa Olusola Ajolore",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Celebrating 100 Years | Pa Olusola Ajolore",
    description:
      "A centennial tribute honoring the life and legacy of Pa Olusola Ajolore.",
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
      className={`${garamond.variable} ${gotham.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
