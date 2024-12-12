"use client";

import "./policies.css";
import { Button } from "@/components/ui/button";
import Sectiontitle from "@/components/global/Sectiontitle";

function Policies() {
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
      <section>
        <div className="flex justify-center">
          <img
            src={"/images/policies.png"}
            style={{ height: "110px" }}
            className="pt-5"
          />
        </div>

        <div
          className="anchors pt-3"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          <Button variant="outline" className="anchor">
            <a onClick={(evt) => handleClick("privacy-policy", evt)}>
              Privacy Policy
            </a>
          </Button>
          <Button variant="outline" className="anchor">
            <a onClick={(evt) => handleClick("return-policy", evt)}>
              Return Policy
            </a>
          </Button>
        </div>
      </section>
      <section id="privacy-policy">
        <Sectiontitle text="Privacy Policy" />
      </section>
      <section id="return-policy">
        <Sectiontitle text="Return Policy" />
        <div className="flex justify-center returns py-8">
          <div>
            <p className="statement">
              We honor refunds or replacements up to 30 days after delivery on
              products that are damaged or defective on arrival.
            </p>
          </div>
          <br />
          <div>
            <p className="statement">
              We do not offer "change of mind" refunds
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Policies;
