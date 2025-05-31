import "./globals.css"
import Navigation from "@/components/Navigation"
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});
import type { Metadata } from "next"

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
        <main className="relative min-h-screen flex flex-col font-thin font-sans">
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  )
}