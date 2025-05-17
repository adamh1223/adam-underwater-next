import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import EProductsList from "../eproducts/EProductsList";
import EProductsGrid from "../eproducts/EProductsGrid";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchAllEProducts, fetchAllProducts } from "@/utils/actions";
import Link from "next/link";
import { Suspense } from "react";
import NavSearch from "@/components/navbar/NavSearch";

async function ProductsContainer({
  layout,
  search,
  isEProduct,
}: {
  layout: string;
  search: string;
  isEProduct: boolean;
}) {
  const products = await fetchAllProducts({ search });
  const EProducts = await fetchAllEProducts({ search });
  console.log(EProducts);

  const totalProducts = products.length;
  const totalEProducts = EProducts.length;
  const totalProductCount = isEProduct? totalEProducts : totalProducts
  const searchTerm = search ? `&search=${search}` : "";
  console.log(totalProducts, '9...9999999999999999');
  const useEProductLayoutButtons = isEProduct && totalEProducts >0
  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex justify-center py-5">
          <Suspense>
            <NavSearch isEProduct={isEProduct}/>
          </Suspense>
        </div>
        <div className="flex justify-between items-center pt-5 px-9">
          <h4 className="font-medium text-xl p-5">
            {totalProductCount} product{totalProductCount > 1 && "s"}
          </h4>
          <div className="flex gap-x-4 p-5">
            {useEProductLayoutButtons ? (
              <>
                <Button
                  variant={layout === "grid" ? "default" : "ghost"}
                  size="icon"
                  asChild
                >
                  <Link href={`/stock?layout=grid${searchTerm}`}>
                    <LuLayoutGrid />
                  </Link>
                </Button>
                <Button
                  variant={layout === "list" ? "default" : "ghost"}
                  size="icon"
                  asChild
                >
                  <Link href={`/stock?layout=list${searchTerm}`}>
                    <LuList />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={layout === "grid" ? "default" : "ghost"}
                  size="icon"
                  asChild
                >
                  <Link href={`/products?layout=grid${searchTerm}`}>
                    <LuLayoutGrid />
                  </Link>
                </Button>
                <Button
                  variant={layout === "list" ? "default" : "ghost"}
                  size="icon"
                  asChild
                >
                  <Link href={`/products?layout=list${searchTerm}`}>
                    <LuList />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      {/* PRODUCTS */}
      <div>
        {isEProduct ? (
          <>
            {!totalEProducts ? (
              <h5 className="text-2xl m-16">
                Sorry, no products matched your search...
              </h5>
            ) : layout === "grid" ? (
              <EProductsGrid EProducts={EProducts} />
            ) : (
              <EProductsList EProducts={EProducts} />
            )}
          </>
        ) : (
          <>
            {totalProducts === 0 ? (
              <h5 className="text-2xl m-16">
                Sorry, no products matched your search...
              </h5>
            ) : layout === "grid" ? (
              <ProductsGrid products={products} isEProduct={false} />
            ) : (
              <ProductsList products={products} isEProduct={false} />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ProductsContainer;
