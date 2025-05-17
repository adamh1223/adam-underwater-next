import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Rating from "./Rating";
import Comment from "./Comment";
import Image from "next/image";
import Link from "next/link";

type ReviewCardProps = {
  reviewInfo: {
    comment: string;
    rating: number;
    name: string;
    image: string;
    productId?: string;
  };
  children?: React.ReactNode;
  removeCircle?: Boolean; 
};

function ReviewCard({ reviewInfo, children, removeCircle }: ReviewCardProps) {
  const imageClassName = removeCircle? "w-12 h-12 object-cover": "w-12 h-12 rounded-full object-cover" 
  const imageToRender = (reviewInfo.image && reviewInfo.productId) ? (<Link href={`/products/${reviewInfo.productId}`}>
            <Image
              src={reviewInfo.image}
              alt={reviewInfo.name}
              width={48}
              height={48}
              className={imageClassName}
            />
            </Link>)
            :
            (<Image
              src={reviewInfo.image}
              alt={reviewInfo.name}
              width={48}
              height={48}
              className={imageClassName}
            />)

  const titleToRender = (reviewInfo.name && reviewInfo.productId) ? (<Link href={`/products/${reviewInfo.productId}`}>
            <h3 className="text-sm font-bold capitalize mb-1">
              {reviewInfo.name}
            </h3>
            </Link>) 
            : 
            (<h3 className="text-sm font-bold capitalize mb-1">
              {reviewInfo.name}
            </h3>)
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center">
          {
           imageToRender
          }
          <div className="ml-4">
            {titleToRender}
            <Rating rating={reviewInfo.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={reviewInfo.comment} />
      </CardContent>
      <div className="absolute top-3 right-3">{children}</div>
    </Card>
  );
}
export default ReviewCard;
