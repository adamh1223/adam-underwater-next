import { formatCurrency } from "@/utils/format";
import { EProduct } from "@prisma/client";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "../single-product/AddToCart";

function ProductsGrid({ EProducts }: { EProducts?: EProduct[] }) {
  return (
    <div className="pt-12 mx-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-5 pb-5">
      <>
        {EProducts?.map((product) => {
          const { name, price, WMVideoLink, downloadLink, thumbnail } = product;

          const productId = product.id;
          const dollarsAmount = formatCurrency(price);
          return (
            <article key={productId} className="group relative">
              <Card className="group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-4">
                  <div className="relative h-full w-full rounded">
                    {thumbnail && (
                      <img
                        src={thumbnail}
                        alt="hi"
                        className="flex items-center justify-center rounded w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    {/* 
                          Insert Video here. 
                          Video plays WMVideoLink on hover. 
                          Keep zoom effect like with products. 
                          Above is format for product image carousel. Either allow a placeholder image or use default frame by video.
                        */}
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="text-lg capitalize">{name}</h2>
                    <p className="text-muted-foreground mt-2">
                      {dollarsAmount}
                    </p>
                    <AddToCart productId={productId} isEProduct />
                  </div>
                </CardContent>
              </Card>
              <div className="absolute top-5 right-2 z-5">
                <FavoriteToggleButton productId={productId} />
              </div>
            </article>
          );
        })}
      </>
    </div>
  );
}

export default ProductsGrid;
