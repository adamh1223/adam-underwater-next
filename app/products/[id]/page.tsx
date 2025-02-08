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

async function SingleProductPage({ params }: { params: { id: string } }) {
  const product = await fetchSingleProduct(params.id);
  const { name, image, company, description, price } = product;
  const dollarsAmount = formatCurrency(price);
  const { userId } = auth();
  const reviewDoesNotExist =
    userId && !(await findExistingReview(userId, product.id));
  return (
    <>
      <section className="px-[60px] pt-[40px]">
        <BreadCrumbs name={product.name} />
        <div className="mt-6 grid gap-y-8 xl:grid-cols-2 xl:gap-x-16 me-5">
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
          <Carousel
            className="w-full max-w-m mx-3 flex items-center justify-center sm: mx-[31px]
          md: mx-[20px]"
          >
            <CarouselContent className="flex">
              {/* First item */}
              <CarouselItem className="flex items-center justify-center">
                <div className="p-4 flex items-center justify-center">
                  <img
                    src={image[0]}
                    alt=""
                    className="max-h-full object-contain"
                  />
                </div>
              </CarouselItem>

              {/* Second item */}
              <CarouselItem className="flex items-center justify-center">
                <div className="p-4 flex items-center justify-center">
                  <img
                    src={image[1]}
                    alt=""
                    className="max-h-full object-contain"
                  />
                </div>
              </CarouselItem>

              {/* Third item */}
              <CarouselItem className="flex items-center justify-center">
                <div className="p-4 flex items-center justify-center">
                  <img
                    src={image[2]}
                    alt=""
                    className="max-h-full object-contain"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* PRODUCT INFO SECOND COL */}
          <div className="lg:ps-3 md:ps-3 sm:ps-3 xl:ps-8">
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
            <div className="flex items-center">
              <AddToCart
                productId={params.id}
                RedirectTo={`/products/${params.id}`}
              />
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
