"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

function ProductCarousel({
  image,
  productId,
}: {
  image: string[];
  productId: string;
}) {
  const [carouselApi, setcarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setcurrentIndex] = useState(0);
  const [totalItems, settotalItems] = useState(0);
  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setcurrentIndex(carouselApi.selectedScrollSnap());
      settotalItems(carouselApi.scrollSnapList().length);
    };

    updateCarouselState();

    carouselApi.on("select", updateCarouselState);

    return () => {
      carouselApi.off("select", updateCarouselState); // Clean up on unmount
    };
  }, [carouselApi]);

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index);
  };
  const increaseIndex = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    scrollToIndex(currentIndex + 1);
  };
  const decreaseIndex = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    scrollToIndex(currentIndex - 1);
  };
  return (
    <>
      <Carousel
        setApi={setcarouselApi}
        className="w-full max-w-7xl transform-none me-4"
      >
        <CarouselContent className="ml-4">
          {/* First item */}
          <CarouselItem>
            <Link href={`/products/${productId}`}>
              <div className="flex items-center pe-8">
                <img
                  src={image[0]}
                  className="flex items-center justify-center"
                  alt=""
                />
                {/* <Image
                  src={image[0]}
                  alt="hi"
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1300px) 50vw, 33vw"
                  priority
                  className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                /> */}
              </div>
            </Link>
            {/* <div className="p-4 flex items-center justify-center">
                            <Image
                              src={image[0]}
                              alt={name}
                              fill
                              sizes="(max-width:768px) 100vw, (max-width:1300px) 50vw, 33vw"
                              priority
                              className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                          </div> */}
          </CarouselItem>

          {/* Second item */}
          <CarouselItem>
            <Link href={`/products/${productId}`}>
              <div className="flex items-center pe-8">
                <img
                  src={image[1]}
                  className="flex items-center justify-center"
                />
              </div>
            </Link>
          </CarouselItem>

          {/* Third item */}
          <CarouselItem>
            <Link href={`/products/${productId}`}>
              <div className="flex items-center pe-8">
                <img
                  src={image[2]}
                  className="flex items-center justify-center"
                />
              </div>
            </Link>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-0 z-40 flex items-center justify-between pointer-events-none">
        <Button
          onClick={decreaseIndex}
          className="pointer-events-auto rounded-full w-8 h-8 p-0 mx-[-8px] shadow-none"
          variant="secondary"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white"></ChevronLeftIcon>
        </Button>
        <Button
          onClick={increaseIndex}
          className="pointer-events-auto rounded-full w-8 h-8 p-0 mx-[-8px] shadow-none"
          variant="secondary"
        >
          <ChevronRightIcon className="h-6 w-6 text-white"></ChevronRightIcon>
        </Button>
      </div>
    </>
  );
}

export default ProductCarousel;
