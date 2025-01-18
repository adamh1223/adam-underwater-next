import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import ProductRating from "@/components/single-product/ProductRating";
import SubmitReview from "@/components/reviews/SubmitReview";
import ProductReviews from "@/components/reviews/ProductReviews";
import { fetchSingleProduct, findExistingReview } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import Sectiontitle from "@/components/global/Sectiontitle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SelectProductSize from "@/components/products/ProductSize";
import AddProductSize from "@/components/single-product/AddProductSize";

async function SingleProductPage({ params }: { params: { id: string } }) {
  const product = await fetchSingleProduct(params.id);
  const { name, image, company, description, price } = product;
  const dollarsAmount = formatCurrency(price);
  const { userId } = auth();
  const reviewDoesNotExist =
    userId && !(await findExistingReview(userId, product.id));
  return (
    <>
      <section className="p-[50px]">
        <BreadCrumbs name={product.name} />
        <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
          {/* IMAGE FIRST COL */}
          {/* <div className="relative h-96">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
              priority
              className="w-full rounded-md object-cover"
            />
          </div> */}
          <Carousel className="w-full max-w-m mx-3">
            <CarouselContent>
              {/* First item */}
              <CarouselItem>
                <div className="p-4 flex items-center justify-center">
                  <img src={image[0]} alt="" />
                </div>
              </CarouselItem>

              {/* Second item */}
              <CarouselItem>
                <div className="p-4 flex items-center justify-center">
                  <img src={image[1]} alt="" />
                </div>
              </CarouselItem>

              {/* Third item */}
              <CarouselItem>
                <div className="p-4 flex items-center justify-center">
                  <img src={image[2]} alt="" />
                </div>
              </CarouselItem>
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {/* PRODUCT INFO SECOND COL */}
          <div className="ps-5">
            <div className="flex gap-x-8 items-center">
              <h1 className="capitalize text-3xl font-bold">{name}</h1>
              <FavoriteToggleButton productId={params.id} />
            </div>
            <ProductRating productId={params.id} />
            <h4 className="text-xl mt-2">{company}</h4>
            <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
              {dollarsAmount}
            </p>
            <p className="mt-6 leading-8 text-muted-foreground">
              {description}
            </p>
            <div>
              <AddToCart productId={params.id} />
            </div>
          </div>
        </div>
        <ProductReviews productId={params.id} />

        {reviewDoesNotExist && <SubmitReview productId={params.id} />}
      </section>
    </>
  );
}
export default SingleProductPage;
