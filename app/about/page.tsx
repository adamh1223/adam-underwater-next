import "./about.css";

function AboutPage() {
  return (
    <section>
      <div className="flex justify-center">
        <img
          src={"/images/aboutme3.png"}
          style={{ height: "110px" }}
          className="pt-5"
        />
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
            <p className="text-lg description">AAUS Scientific Diver</p>
          </div>
          <div className="about-icon-container">
            <img src={"/images/faa-logo.png"} className="about-icon" />
            <p className="text-lg description">FAA Part 107 Drone Operator</p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-lg tracking-wide leading-8 max-w-5xl mx-auto ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero hic
        distinctio ducimus temporibus nobis autem laboriosam repellat, magni
        fugiat minima excepturi neque, tenetur possimus nihil atque! Culpa nulla
        labore nam?
      </p>
    </section>
  );
}

export default AboutPage;
