"use client";

import Sectiontitle from "@/components/global/Sectiontitle";
import "./services.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function page() {
  const handleClick = (
    sectionId: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    let section = document.getElementById(sectionId);
    event.preventDefault();
    section && section.scrollIntoView({ behavior: "smooth" });
  };

  const [isVideoReady, setIsVideoReady] = useState(false);

  const handleVideoLoad = () => {
    setTimeout(() => {
      setIsVideoReady(true); // Switch to video only when loaded
    }, 5000);
  };

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
    <>
      <div className="flex justify-center pb-5">
        <img
          src={"/images/services2.png"}
          style={{ height: "110px" }}
          className="pt-3"
        />
      </div>

      <div
        className="anchors"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <Button variant="outline" className="anchor">
          <a onClick={(evt) => handleClick("video", evt)}>Underwater Video</a>
        </Button>
        <Button variant="outline" className="anchor">
          <a onClick={(evt) => handleClick("photo", evt)}>Underwater Photo</a>
        </Button>
        <Button variant="outline" className="anchor">
          <a onClick={(evt) => handleClick("dives", evt)}>Guided Dives</a>
        </Button>
      </div>
      <Sectiontitle text="Underwater 8K Video" />
      <section
        id="video"
        className="flex flex-col items-center justify-center text-center main"
      >
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

          {/* <div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1018553050?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="website"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script> */}
        </div>
      </section>
      <section id="photo" className="h-[500px]">
        <Sectiontitle text="Underwater 45mp Photo" />
      </section>
      <section id="dives" className="h-[500px]">
        <Sectiontitle text="Guided Dives" />
        <ul className="subheader">
          <h1>Go diving with me Southern California</h1>
        </ul>
        <div className="gear-container">
          <Carousel className="w-full max-w-sm">
            <CarouselContent>
              {/* First item */}
              <CarouselItem>
                <div className="p-4 flex items-center justify-center">
                  <img src={"/images/gear1.png"} alt="" />
                </div>
              </CarouselItem>

              {/* Second item */}
              <CarouselItem>
                <div className="p-4 flex items-center justify-center">
                  <img src={"/images/gear2.png"} alt="" />
                </div>
              </CarouselItem>

              {/* Third item */}
              <CarouselItem>
                <div className="p-4 flex items-center justify-center">
                  <img src={"/images/gear3.png"} alt="" />
                </div>
              </CarouselItem>
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </>
  );
}

export default page;
