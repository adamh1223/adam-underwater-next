import Sectiontitle from "@/components/global/Sectiontitle";
import { Button } from "@/components/ui/button";
import "../services/services.css";
import ProductsContainer from "@/components/products/ProductsContainer";

function EProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) {
  const layout = searchParams?.layout || "grid";
  const search = searchParams?.search || "";
  return (
    <>
      <div className="flex justify-center pb-5 ps-1">
        <img
          src={"/images/stock2.png"}
          style={{ height: "120px" }}
          className="pt-2"
        />
      </div>
      <ProductsContainer layout={layout} search={search} isEProduct />
    </>
  );
}

export default EProductsPage;
