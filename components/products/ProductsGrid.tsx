import { formatCurrency } from "@/utils/format";
import { EProduct, Product } from "@prisma/client";
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

function ProductsGrid({
  products,
  EProducts,
  isEProduct,
}: {
  products?: Product[];
  EProducts?: EProduct[];
  isEProduct: boolean;
}) {
  console.log(isEProduct, '8888888888888');
  
  return (
    <div className="pt-12 mx-8 grid gap-4 md:grid-cols-2 px-5 pb-5">
      <>
        {isEProduct ? (
          <>
            {EProducts?.map((product) => {
              const { name, price, WMVideoLink, downloadLink } = product;

              const productId = product.id;
              const dollarsAmount = formatCurrency(price);
              return (
                <article key={productId} className="group relative">
                  <Card className="group-hover:shadow-xl transition-shadow duration-500">
                    <CardContent className="p-4">
                      <div className="relative h-full w-full rounded">
                        {/* 
                          <img
                          src={image[0]}
                          alt="hi"
                          className="flex items-center justify-center rounded w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                        */}
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
                        <AddToCart
                          productId={productId}
                          RedirectTo={`/products`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <div className="absolute top-5 right-2 z-5">
                    <FavoriteToggleButton productId={productId} EProductId={null} />
                  </div>
                </article>
              );
            })}
          </>
        ) : (
          <>
            {products?.map((product) => {
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
                        <p className="text-muted-foreground mt-2">
                          {dollarsAmount}
                        </p>
                        <AddToCart
                        isEProduct = {false}
                          productId={productId}
                          RedirectTo={`/products/${productId}`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <div className="absolute top-5 right-2 z-5">
                    <FavoriteToggleButton productId={productId} EProductId={null} />
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

export default ProductsGrid;
