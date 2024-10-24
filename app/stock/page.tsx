"use client";

import Sectiontitle from "@/components/global/Sectiontitle";
import { Button } from "@/components/ui/button";
import "../services/services.css";

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
      <div className="flex justify-center pb-5 ps-1">
        <img
          src={"/images/stock2.png"}
          style={{ height: "120px" }}
          className="pt-2"
        />
      </div>

      <div
        className="anchors"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <Button variant="outline" className="anchor">
          <a onClick={(evt) => handleClick("video", evt)}>Stock Video</a>
        </Button>
        <Button variant="outline" className="anchor">
          <a onClick={(evt) => handleClick("photo", evt)}>Stock Photo</a>
        </Button>
      </div>

      <section id="video" className="h-[500px]">
        <Sectiontitle text="Stock Video" />
      </section>
      <section id="photo" className="h-[500px]">
        <Sectiontitle text="Stock Photo" />
      </section>
    </>
  );
}

export default page;
