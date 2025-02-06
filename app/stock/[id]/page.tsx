import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import ProductRating from "@/components/single-product/ProductRating";
import SubmitReview from "@/components/reviews/SubmitReview";
import ProductReviews from "@/components/reviews/ProductReviews";
import {
  fetchSingleEProduct,
  fetchSingleProduct,
  findExistingReview,
} from "@/utils/actions";
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

async function SingleEProductPage({ params }: { params: { id: string } }) {
  const EProduct = await fetchSingleEProduct(params.id);
  const { name, WMVideoLink, description, price } = EProduct;
  const dollarsAmount = formatCurrency(price);
  const { userId } = auth();
  return (
    <>
      <section className="p-[50px]">
        <BreadCrumbs name={EProduct.name} />
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
          <iframe
            src={`https://player.vimeo.com/video/${WMVideoLink}?autoplay=1&muted=1&background=1&badge=0&autopause=0`}
            allow="autoplay; loop;"
          ></iframe>
          {/* PRODUCT INFO SECOND COL */}
          <div className="ps-5">
            <div className="flex gap-x-8 items-center">
              <h1 className="capitalize text-3xl font-bold">{name}</h1>
              <FavoriteToggleButton productId={params.id} />
            </div>

            <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
              {dollarsAmount}
            </p>
            <p className="mt-6 leading-8 text-muted-foreground">
              {description}
            </p>
            <div className="flex items-center">
              <AddToCart
                productId={params.id}
                isEProduct
                RedirectTo={`/stock/${params.id}`}
                // redirectto for all add to cart buttons
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default SingleEProductPage;
