import "./about.css";

function AboutPage() {
  return (
    <section>
      <div className="flex justify-center">
        <img
          src={"/images/aboutme3.png"}
          style={{ height: "110px" }}
          className="pt-5"
        ></img>
      </div>
      <div className="headshot-container flex flex-row justify-center">
        <img src={"/images/headshot3.png"} className="pt-5 headshot"></img>
        <div className="about-icons flex justify-center mx-3">
          <div className="about-icon-container pe-5">
            <img src={"/images/padi-logo2.png"} className="about-icon p-5" />
            <p>PADI Open Water Scuba Instructor</p>
          </div>
          <div className="about-icon-container px-5">
            <img src={"/images/aaus-logo.png"} className="about-icon p-5" />
            <p>AAUS Scientific Diver</p>
          </div>
          <div className="about-icon-container">
            <img src={"/images/faa-logo.png"} className="about-icon p-5" />
            <p>FAA Part 107 Certified Drone Pilot</p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-lg tracking-wide leading-8 max-w-5xl mx-auto text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero hic
        distinctio ducimus temporibus nobis autem laboriosam repellat, magni
        fugiat minima excepturi neque, tenetur possimus nihil atque! Culpa nulla
        labore nam?
      </p>
    </section>
  );
}
export default AboutPage;
