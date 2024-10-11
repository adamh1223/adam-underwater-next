import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import "./Hero.css";

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center main">
      <video src={"/videos/website.mp4"} autoPlay loop muted></video>
      <div className="content">
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight pb-2 px-3">
          Underwater Video and Photo
        </h1>
        <Button size="lg" className="mt-5">
          <Link href="/work">Dive in</Link>
        </Button>
      </div>
    </section>
  );
}

export default Hero;
