"use client";

import Sectiontitle from "@/components/global/Sectiontitle";
import "./services.css";
import { Button } from "@/components/ui/button";

function page() {
  const handleClick = (
    sectionId: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    let section = document.getElementById(sectionId);
    event.preventDefault();
    section && section.scrollIntoView({ behavior: "smooth" });
  };
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

      <section id="video" className="h-[500px]">
        <Sectiontitle text="Underwater 8K Video" />
      </section>
      <section id="photo" className="h-[500px]">
        <Sectiontitle text="Underwater 45mp Photo" />
      </section>
      <section id="dives" className="h-[500px]">
        <Sectiontitle text="Guided Dives" />
      </section>
    </>
  );
}

export default page;
