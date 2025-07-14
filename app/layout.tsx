import React from "react";
import "./globals.css";

import Navigation from "@/components/Navigation";
import { Roboto } from "next/font/google";
import StarRoot from "@/components/StarRoot";
import DynamicFavicon from "@/components/DynamicFavicon";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <DynamicFavicon />
        <StarRoot />
        <main className="relative min-h-screen flex flex-col font-thin font-sans">
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  );
}