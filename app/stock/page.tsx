import Sectiontitle from "@/components/global/Sectiontitle";
import { Button } from "@/components/ui/button";
import "../services/services.css";
import ProductsContainer from "@/components/products/ProductsContainer";
import { Card } from "@/components/ui/card";
import './stock.css'

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
      <div className="flex justify-center returns">
        <Card className="my-7 p-5 card">
          <div>
            <p className="statement">
              Bring your videos to life with professionally shot underwater
              footage.
            </p>
          </div>
          <div>
            <p className="statement">
              Shot on Canon and RED cinema cameras with Nauticam underwater
              housing across South Africa, Australia, Hawaii, California, and British Columbia.
            </p>
          </div>
        </Card>
      </div>
      <ProductsContainer layout={layout} search={search} isEProduct />
    </>
  );
}

export default EProductsPage;
