import React from "react";
import ProductsContainer from "@/components/products/ProductsContainer";
import Sectiontitle from "@/components/global/Sectiontitle";
import { Button } from "@/components/ui/button";
import "./products.css";
import { Card } from "@/components/ui/card";

function ProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) {
  const layout = searchParams?.layout || "grid";
  const search = searchParams?.search || "";
  console.log(searchParams);
  // const handleClick = (
  //   sectionId: string,
  //   event: React.MouseEvent<HTMLAnchorElement>
  // ) => {
  //   let section = document.getElementById(sectionId);
  //   event.preventDefault();
  //   section && section.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <>
      <div className="flex justify-center pb-3" id="prints">
        <img
          src={"/images/products.png"}
          style={{ height: "120px" }}
          className="pt-3"
        ></img>
      </div>
      <div className="flex justify-center font-extrabold text-3xl py-2">
        <p>Canvas Wall Art</p>
      </div>
      <p className="flex justify-center font-semibold text-l">
        Bring the ocean into your home
      </p>

      <div className="flex justify-center returns">
        <Card className="my-7 p-5">
          <div>
            <p className="statement">1.5" Gallery-Wrap frames</p>
          </div>
          <div>
            <p className="statement">Customizable sizes</p>
          </div>
          <div>
            <p className="statement">High quality canvas</p>
          </div>

          <div>
            <p className="statement">Printed on Canon 4400 Pro Printer</p>
          </div>
        </Card>
      </div>

      {/* <div
        className="anchors"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <Button variant="outline" className="anchor">
          <a onClick={(evt) => handleClick("prints", evt)}>Prints</a>
        </Button>
        <Button variant="outline" className="anchor">
          <a onClick={(evt) => handleClick("print-creation", evt)}>Print Creation</a>
        </Button>
      </div> */}

      <ProductsContainer layout={layout} search={search} />
      {/* <section id="print-creation" className="h-[500px]">
        <Sectiontitle text="Print Creation Process" />
      </section> */}
      <section id="luts" className="h-[500px]">
        <Sectiontitle text="LUT Packs" />
        <h1 className="subheader">
          Color grade your underwater video footage with my custom LUTS
        </h1>
      </section>
      <section id="soundfx" className="h-[500px]">
        <Sectiontitle text="Ocean Sound FX Bundle" />
      </section>
    </>
  );
}

export default ProductsPage;
