import { fetchAllProducts } from "@/utils/actions";
import React from "react";
import EmptyList from "../global/EmptyList";
import Sectiontitle from "../global/Sectiontitle";
import ProductsGrid from "../products/ProductsGrid";

async function FeaturedProducts() {
  const products = await fetchAllProducts();
  if (products.length === 0) return <EmptyList />;
  return (
    <section className="pt-24">
      <div className="flex justify-center">
        <img src={"/images/featured.png"} style={{ height: "90px" }}></img>
      </div>
      <ProductsGrid products={products} />
    </section>
  );
}

export default FeaturedProducts;
