
import "./globals.css"

import Navigation from "@/components/Navigation"
import { Roboto } from 'next/font/google'
// import { usePathname } from 'next/navigation';
// import Stars from "@/components/Stars";
import { Metadata } from "next";
import StarRoot from "@/components/StarRoot";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Ramon Morcillo",
  description: "Portfolio and blog of Ramon Morcillo",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <StarRoot />
        <main className="relative min-h-screen flex flex-col font-thin font-sans">
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  )
}