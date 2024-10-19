"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import "./Hero.css";

function Hero() {
  const [isVideoReady, setIsVideoReady] = useState(false);

  const handleVideoLoad = () => setIsVideoReady(true); // Switch to video only when loaded

  useEffect(() => {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      iframe.addEventListener("load", handleVideoLoad);
    }
    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleVideoLoad);
      }
    };
  }, []);

  return (
    <section className="flex flex-col items-center justify-center text-center main">
      <div className="media-container">
        <img
          src="/images/print1.jpg"
          alt="Loading video..."
          className={`placeholder ${isVideoReady ? "hidden" : ""}`}
        />
        <iframe
          src="https://player.vimeo.com/video/1018553050?autoplay=1&loop=1&muted=1&background=1"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className={`video ${isVideoReady ? "visible" : ""}`}
          title="Background Video"
        ></iframe>
      </div>
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
