import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center">
      <h1 className="max-w-2xl font-bold text-5xl tracking-tight">
        Underwater Video and Photo
      </h1>
      <Button size="lg" className="mt-10">
        <Link href="/work">Dive in</Link>
      </Button>
    </section>
  );
}

export default Hero;
