import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Equipment Rent",
  description: "Equipment Rental Platform",
  icons: {
    icon: "/icon.svg",
  },
};

import { CartProvider } from "@/contexts/CartContext";
import { LocationProvider } from "@/contexts/LocationContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <LocationProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
