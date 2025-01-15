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

function ProductCarousel({ image }: { image: string[] }) {
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
  return (
    <>
      <Carousel
        setApi={setcarouselApi}
        className="w-full max-w-sm transform-none"
      >
        <CarouselContent>
          {/* First item */}
          <CarouselItem>
            <div className="p-4 flex items-center justify-center">
              <img src={image[0]} alt="" />
            </div>
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
            <div className="p-4 flex items-center justify-center">
              <img src={image[1]} className="h-full w-full" />
            </div>
          </CarouselItem>

          {/* Third item */}
          <CarouselItem>
            <div className="p-4 flex items-center justify-center">
              <img src={image[2]} className="h-full w-full" />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-0 z-20 flex items-center justify-between pointer-events-none">
        <Button
          onClick={() => scrollToIndex(currentIndex - 1)}
          className="pointer-events-auto rounded-full w-32 h-32 p-0 bg-transparent shadow-none hover:bg-transparent"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white"></ChevronLeftIcon>
        </Button>
        <Button
          onClick={() => scrollToIndex(currentIndex + 1)}
          className="pointer-events-auto rounded-full w-32 h-32 p-0 bg-transparent shadow-none hover:bg-transparent"
        >
          <ChevronRightIcon className="h-6 w-6 text-white"></ChevronRightIcon>
        </Button>
      </div>
    </>
  );
}

export default ProductCarousel;
