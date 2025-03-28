import { deleteReviewAction, fetchProductReviewsByUser } from "@/utils/actions";
import ReviewCard from "@/components/reviews/ReviewCard";
import SectionTitle from "@/components/global/Sectiontitle";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Buttons";
async function ReviewsPage() {
  const reviews = await fetchProductReviewsByUser();
  console.log(reviews, 'TTTTTTTTTTTT');
  
  if (reviews.length === 0)
    return <SectionTitle text="you have no reviews yet" />;

  return (
    <>
      <div className="flex justify-center pb-5">
        <img
          src={"/images/reviews2.png"}
          style={{ height: "110px" }}
          className="pt-5"
        ></img>
      </div>
      <section className="grid md:grid-cols-2 gap-8 mt-4 ">
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { name, image, id } = review.product;
          const reviewInfo = {
            comment,
            rating,
            name,
            image: image[0],
            productId: id,
          };
          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo} removeCircle={true}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </section>
    </>
  );
}

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId });
  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
};

export default ReviewsPage;
