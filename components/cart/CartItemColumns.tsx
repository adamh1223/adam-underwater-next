import { formatCurrency } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export const FirstColumn = ({
  name,
  image,
}: {
  image?: string[];
  name: string;
}) => {
  if (!image) {
    return null;
  }
  return (
    <div className="relative h-24 w-24 sm:h-32 sm:w-32">
      <Image
        src={image[0]}
        alt={name}
        fill
        sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
        priority
        className="w-full rounded-md object-cover"
      />
    </div>
  );
};
export const SecondColumn = ({
  name,
  company,
  productId,
  EProductId,
}: {
  name?: string;
  company?: string;
  productId?: string;
  EProductId?: string;
}) => {
  return (
    <div className=" sm:w-48">
      {productId ? (
        <Link href={`/products/${productId}`}>
          <h3 className="capitalize font-medium hover:underline">{name}</h3>
        </Link>
      ) : (
        <Link href={`/stock/${EProductId}`}>
          <h3 className="capitalize font-medium hover:underline">{name}</h3>
        </Link>
      )}
      <h4 className="mt-2 capitalize text-xs">{company}</h4>
    </div>
  );
};

export const FourthColumn = ({ price }: { price?: number }) => {
  return <p className="font-medium md:ml-auto">{formatCurrency(price ?? 0)}</p>;
};
