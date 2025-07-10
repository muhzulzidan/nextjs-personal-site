
import "./globals.css"

import Navigation from "@/components/Navigation"
import { Roboto } from 'next/font/google'
// import { usePathname } from 'next/navigation';
// import Stars from "@/components/Stars";
// import { Metadata } from "next";
import StarRoot from "@/components/StarRoot";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

import { Metadata } from "next";
import { getRandomFruit } from "@/app/utils";

export async function generateMetadata(): Promise<Metadata> {
  const fruit = getRandomFruit();
  const fruitFaviconMap: Record<string, string> = {
    kiwi: "/images/favicon/kiwi.png",
    coconut: "/images/favicon/coconut.png",
    grapes: "/images/favicon/grapes.png",
    melon: "/images/favicon/melon.png",
    watermelon: "/images/favicon/watermelon.png",
    orange: "/images/favicon/orange.png",
    lemon: "/images/favicon/lemon.png",
    banana: "/images/favicon/banana.png",
    pineapple: "/images/favicon/pineapple.png",
    red_apple: "/images/favicon/red_apple.png",
    green_apple: "/images/favicon/green_apple.png",
    pear: "/images/favicon/pear.png",
    peach: "/images/favicon/peach.png",
    cherries: "/images/favicon/cherries.png",
    strawberry: "/images/favicon/strawberry.png",
  };
  const favicon = fruitFaviconMap[fruit] || "/favicon.ico";

  return {
    title: "Ramon Morcillo",
    description: "Portfolio and blog of Ramon Morcillo",
    icons: {
      icon: [
        { url: favicon, type: "image/png" }
      ]
    }
  };
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