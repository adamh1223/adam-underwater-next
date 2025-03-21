import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { EProduct, Product } from "@prisma/client";
import Image from "next/image";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import EProductPreview from "./EProductPreview";
import "./List.css";

function ProductsList({ EProducts }: { EProducts?: EProduct[] }) {
  return (
    <div className="mt-12 grid gap-y-8">
      <>
        {EProducts?.map((product) => {
          const { name, price, thumbnail } = product;
          console.log("AAAAAAAAAAAAAAAAAA", thumbnail);

          const dollarsamount = formatCurrency(price);
          const productId = product.id;
          return (
            <article key={productId} className="group relative">
              <Link href={`/products/${productId}`}>
                <Card className="transform group-hover:shadow-xl transition-shadow duration-500 mx-8 my-3">
                  <CardContent className="p-6 ps-6 pt-8 gap-y-4 grid md:grid-cols-3">
                    <div className="relative">
                      {/* {thumbnail != null &&
                            thumbnail.length >
                              0 && (
                                <Image
                                  src={thumbnail}
                                  alt={name}
                                  fill
                                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                                  priority
                                  className="w-full rounded object-cover"
                                />
                              )} */}
                      <EProductPreview
                        EProduct={product}
                        extraClassName="w-96"
                      />
                    </div>
                    <div className="ps-8">
                      <h2 className="text-xl font-semibold capitalize">
                        {name}
                      </h2>
                    </div>
                    <p className="text-muted-foreground text-lg md:ml-auto">
                      {dollarsamount}
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <div className="absolute bottom-8 right-8 z-5 p-5">
                <FavoriteToggleButton EProductId={productId} productId={null}  />
              </div>
            </article>
          );
        })}
      </>
    </div>
  );
}

export default ProductsList;
