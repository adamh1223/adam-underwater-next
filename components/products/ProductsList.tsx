import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { EProduct, Product } from "@prisma/client";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";
import ProductCarousel from "./ProductCarousel";

function ProductsList({
  products,
  EProducts,
  isEProduct,
}: {
  products?: Product[];
  EProducts?: EProduct[];
  isEProduct: boolean;
}) {
  return (
    <div className="mt-12 grid gap-y-8">
      <>
        {isEProduct ? (
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
                      <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                        <div className="relative h-64 md:h-48 md:w-48">
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
                        </div>
                        <div>
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
                    <FavoriteToggleButton
                      productId={productId}
                      EProductId={null}
                    />
                  </div>
                </article>
              );
            })}
          </>
        ) : (
          <>
            {products?.map((product) => {
              const { name, price, image, company } = product;
              const dollarsamount = formatCurrency(price);
              const productId = product.id;
              return (
                <article key={productId} className="group relative">
                  <Link href={`/products/${productId}`}>
                    <Card className="transform group-hover:shadow-xl transition-shadow duration-500 mx-8 my-3">
                      <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                        <div className="relative">
                          {/* <Image
                            src={image[0]}
                            alt={name}
                            fill
                            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                            priority
                            className="w-full rounded object-cover"
                          /> */}
                          <ProductCarousel
                            image={image}
                            productId={productId}
                          ></ProductCarousel>
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold capitalize ps-5">
                            {name}
                          </h2>
                          <h4 className="text-muted-foreground ps-5">
                            {company}
                          </h4>
                        </div>
                        <p className="text-muted-foreground text-lg md:ml-auto ps-5">
                          {dollarsamount}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                  <div className="absolute bottom-8 right-8 z-5 p-5">
                    <FavoriteToggleButton
                      productId={productId}
                      EProductId={null}
                    />
                  </div>
                </article>
              );
            })}
          </>
        )}
      </>
    </div>
  );
}

export default ProductsList;
