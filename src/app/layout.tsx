import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Vikram's Kitchen | Pure Veg Restaurant - Tradition | Taste | Trust",
  description:
    "The Vikram's Kitchen - Pure Veg Multi-Cuisine Restaurant in Lakadganj, Nagpur. Serving authentic North Indian, South Indian, Chinese & Continental cuisine. Tradition | Taste | Trust.",
  keywords:
    "vikrams kitchen, pure veg restaurant, nagpur, lakadganj, south indian, north indian, vegetarian, dosa, idli",
  openGraph: {
    title: "The Vikram's Kitchen | Pure Veg Restaurant",
    description: "Tradition | Taste | Trust - Pure Veg Multi-Cuisine Restaurant in Nagpur",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-poppins)" }}>
        {children}
      </body>
    </html>
  );
}
