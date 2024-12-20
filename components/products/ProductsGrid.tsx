import { formatCurrency } from "@/utils/format";
import { Product } from "@prisma/client";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";
import AddToCart from "../single-product/AddToCart";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="pt-12 mx-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-5 pb-5">
      {products.map((product) => {
        const { name, price, image } = product;
        console.log(
          "as;dlfaklskd;falksdjf;laksjd;flkajsd;flkajs;dlfkjas;ldkfjasl;d"
        );
        console.log(image);

        const productId = product.id;
        const dollarsAmount = formatCurrency(price);
        return (
          <article key={productId} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-4">
                  <div className="relative h-80 md:h-48 rounded overflow-hidden">
                    {/* <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1300px) 50vw, 33vw"
                      priority
                      className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    /> */}
                    <Carousel className="w-full max-w-sm">
                      <CarouselContent>
                        {/* First item */}
                        <CarouselItem>
                          <div className="p-4 flex items-center justify-center">
                            <img src={image[0]} />
                          </div>
                        </CarouselItem>

                        {/* Second item */}
                        <CarouselItem>
                          <div className="p-4 flex items-center justify-center">
                            <img src={image[1]} />
                          </div>
                        </CarouselItem>

                        {/* Third item */}
                        <CarouselItem>
                          <div className="p-4 flex items-center justify-center">
                            <img src={image[2]} />
                          </div>
                        </CarouselItem>
                      </CarouselContent>

                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="text-lg capitalize">{name}</h2>
                    <p className="text-muted-foreground mt-2">
                      {dollarsAmount}
                    </p>
                    <AddToCart productId={productId} />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-7 right-7 z-5">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductsGrid;
