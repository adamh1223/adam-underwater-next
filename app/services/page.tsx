import Sectiontitle from "@/components/global/Sectiontitle";
import "./services.css";
import { Button } from "@/components/ui/button";

function page() {
  return (
    <>
      <div className="flex justify-center pb-5 ps-1">
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
          <a href="#video">Underwater Video</a>
        </Button>
        <Button variant="outline" className="anchor">
          <a href="#photo">Underwater Photo</a>
        </Button>
        <Button variant="outline" className="anchor">
          <a href="#dives">Guided Dives</a>
        </Button>
      </div>

      <section id="video">
        <Sectiontitle text="Underwater 8K Video" />
      </section>
    </>
  );
}

export default page;
