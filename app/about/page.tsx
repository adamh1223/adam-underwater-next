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
      <div className="flex justify-center">
        <div>
          <img
            src={"/images/padi-logo2.png"}
            style={{ height: "180px" }}
            className="p-5"
          />
          <p>Padi</p>
        </div>
        <div>
          <img
            src={"/images/aaus-logo.png"}
            style={{ height: "180px" }}
            className="p-5"
          />
        </div>
        <div>
          <img
            src={"/images/faa-logo.png"}
            style={{ height: "180px" }}
            className="p-5"
          />
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
