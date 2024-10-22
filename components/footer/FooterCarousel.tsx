import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function LoopingCarousel() {
  return (
    <div className="w-full h-30 flex items-center justify-center py-5">
      <Carousel className="w-full max-w-lg">
        <CarouselContent>
          <CarouselItem className="flex justify-center items-center">
            <p className="text-l">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              rerum minima, aspernatur corrupti, dolores eum cupiditate est eos
              quasi necessitatibus hic dolore, labore officia cumque
              perspiciatis enim quia magni rem.
            </p>
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center">
            <p className="text-2xl">testimonial 2</p>
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center">
            <p className="text-2xl">testimonial 3</p>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
