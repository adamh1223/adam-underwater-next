"use client";

import "./about.css";
import { Button } from "@/components/ui/button";
import Sectiontitle from "@/components/global/Sectiontitle";

function AboutPage() {
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
      <section id="about">
        <div className="flex justify-center">
          <img
            src={"/images/aboutme3.png"}
            style={{ height: "110px" }}
            className="pt-5"
          />
        </div>

        <div
          className="anchors"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          <Button variant="outline" className="anchor">
            <a onClick={(evt) => handleClick("about", evt)}>About Me</a>
          </Button>
          <Button variant="outline" className="anchor">
            <a onClick={(evt) => handleClick("gear", evt)}>My Gear</a>
          </Button>
          <Button variant="outline" className="anchor">
            <a onClick={(evt) => handleClick("workflow", evt)}>My Workflow</a>
          </Button>
        </div>

        <div className="about-container">
          <img src={"/images/headshot3.png"} className="pt-5 headshot" />

          <div className="about-icon-wrapper">
            <div className="about-icon-container">
              <img src={"/images/padi-logo2.png"} className="padi-icon" />
              <p className="padi-description text-lg">
                PADI Open Water Scuba Instructor
              </p>
            </div>

            <div className="about-icon-container">
              <img src={"/images/aaus-logo.png"} className="about-icon" />
              <p className="text-lg description sci-description">
                AAUS Scientific Diver
              </p>
            </div>
            <div className="about-icon-container">
              <img src={"/images/faa-logo.png"} className="about-icon" />
              <p className="text-lg description faa-description">
                FAA Part 107 Drone Operator
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-lg tracking-wide leading-8 m-[50px] mt-[60px]">
          My career as a camera operator and Director of Photography took me
          into the water. From my first experience earning my PADI Open Water
          Scuba certification, my relationship with the ocean changed, and my
          path toward underwater cinematography began.
          <br />
          <br />
          While I continued working as a camera operator, I found more and more
          opportunities to film underwater. I am fortunate to have worked with{" "}
          <a
            href="https://gifts.worldwildlife.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            The World Wildlife Fund
          </a>
          ,{" "}
          <a
            href="https://www.urchinomics.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Urchinomics
          </a>
          ,{" "}
          <a
            href="https://www.santamonicabay.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            The Bay Foundation
          </a>
          ,{" "}
          <a
            href="https://www.paradeigm.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Paradeigm Films
          </a>
          ,{" "}
          <a
            href="https://odysseyfreediving.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Odyssey Freediving
          </a>{" "}
          among other commercial video productions and feature films as an
          underwater cinematographer and director.
          <br />
          <br />
          As I filmed underwater professionally, I continued my diving education
          and became a PADI Open Water Scuba Instructor, Emergency First
          Response Instructor, and PADI advanced freediver.
          <br />
          <br />
          Through my experience filming and photographing wildlife underwater I
          began <span className="font-semibold">large format printing</span> my
          high resolution underwater images. Over the years, I have refined the
          printing process to maximize quality from the canvas paper to the ink
          to the printer itself to bring the magic of the ocean into people's
          homes. Navigate to the{" "}
          <a
            href="/products"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Products
          </a>{" "}
          page to browse my prints.
          <br />
          <br />I am directing my first feature documentary "Seaforestation"
          about the decline of kelp forests worldwide. For this project I have
          filmed in California, British Columbia, South Africa, and Australia to
          document kelp forest declines. For more information on Seaforestation
          head to the film website at{" "}
          <a
            href="https://seaforestfilm.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            seaforestfilm.com
          </a>{" "}
          <br />
          <br />I am available for hire as a cinematographer and director in underwater video production and photography.
          Based in San Diego, CA
        </p>
      </section>
      <section id="gear" className="h-[500px]">
        <Sectiontitle text="My Gear" />
      </section>
      <section id="workflow" className="h-[500px]">
        <Sectiontitle text="My Workflow" />
      </section>
    </>
  );
}

export default AboutPage;
