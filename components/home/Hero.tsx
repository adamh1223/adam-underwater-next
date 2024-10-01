import React from "react";
import HeroCarousel from "./HeroCarousel";

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:"></h1>
      </div>
      <HeroCarousel />
    </section>
  );
}

export default Hero;
