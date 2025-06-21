import Stars from "@/components/Stars";

export default function Home() {
  return (
  <div>
      <Stars
        normalVelocity={0.0001}
        containerOpacity={0.3}
      />
      <section className="absolute top-0 left-0 md:right-0   text-xl md:text-2xl sm:text-xl leading-snug text-left md:text-right font-light p-6  lg:p-20">
        <h1 className="font-thin">
          Hey, I am Ramón <span role="img" aria-label="waving hand">👋</span>
        </h1>
      </section>
  </div>
  );
}