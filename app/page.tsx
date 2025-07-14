"use client"

import Stars from "@/components/Stars";
import { useStarColorStore } from "./utils/starColorStore";

export default function Home() {
  const starColor = useStarColorStore((state) => state.starColor);
  console.log('Home render, starColor:', starColor);
  return (
    <div>
      <Stars starColor={starColor} />
      <section className="absolute top-0 left-0 md:right-0   text-xl md:text-2xl sm:text-xl leading-snug text-left md:text-right font-light p-6  lg:py-20 lg:px-12">
        <h1 className="font-thin">
          Hey, I am Ramón <span role="img" aria-label="waving hand">👋</span>
        </h1>
      </section>
    </div>
  );
}