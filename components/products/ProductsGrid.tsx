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
import ProductCarousel from "./ProductCarousel";

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="pt-12 mx-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-5 pb-5">
      {products.map((product) => {
        const { name, price, image } = product;
        console.log(image);

        const productId = product.id;
        const dollarsAmount = formatCurrency(price);
        return (
          <article key={productId} className="group relative">
            <Card className="group-hover:shadow-xl transition-shadow duration-500">
              <CardContent className="p-4">
                <div className="relative h-full w-full rounded">
                  {/* <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1300px) 50vw, 33vw"
                      priority
                      className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    /> */}

                  <ProductCarousel
                    image={image}
                    productId={productId}
                  ></ProductCarousel>
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-lg capitalize">{name}</h2>
                  <p className="text-muted-foreground mt-2">{dollarsAmount}</p>
                  <AddToCart productId={productId} />
                </div>
              </CardContent>
            </Card>
            <div className="absolute top-5 right-2 z-5">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductsGrid;
