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
      <Sectiontitle text="featured products" />
      <ProductsGrid products={products} />
    </section>
  );
}

export default FeaturedProducts;
