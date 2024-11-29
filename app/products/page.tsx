import React from "react";
import ProductsContainer from "@/components/products/ProductsContainer";
import Sectiontitle from "@/components/global/Sectiontitle";
import { Button } from "@/components/ui/button";
import "./products.css";

function ProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) {
  const layout = searchParams.layout || "grid";
  const search = searchParams.search || "";
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
          src={"/images/prints2.png"}
          style={{ height: "110px" }}
          className="pt-3"
        ></img>
      </div>
      <div className="flex justify-center font-extrabold text-3xl py-2">
        <p>Canvas Wall Art</p>
      </div>
      <p className="flex justify-center font-semibold text-l">
        Bring the ocean into your home
      </p>
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
      </section>
      <section id="soundfx" className="h-[500px]">
        <Sectiontitle text="Ocean Sound FX Bundle" />
      </section>
    </>
  );
}

export default ProductsPage;
