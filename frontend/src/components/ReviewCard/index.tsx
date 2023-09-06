import { FormEvent, useState } from "react";
import { ReviewRequest, ReviewResponse } from "../../types";
import { Modal } from "../../components";
import {
  useCreateReviewForProductMutation,
  useDeleteReviewForProductMutation,
} from "../../redux/features/review/reviewFeature.ts";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { convertDate } from "../../utils/convertDate.ts";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

interface ReviewCardProps {
  reviews?: ReviewResponse[] | undefined;
  productId: number;
  customerId: number;
  validation: boolean;
}

export default function ReviewCard({
  reviews,
  customerId,
  productId,
  validation,
}: ReviewCardProps) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [createReviewForProduct] = useCreateReviewForProductMutation();
  const [deleteReviewForProduct] = useDeleteReviewForProductMutation();

  const [productReviews, setProductReviews] = useState<
    ReviewResponse[] | undefined
  >(reviews);

  const calculateAverageRating = () => {
    if (productReviews?.length === 0) return 0;

    let sum = 0;
    productReviews?.forEach((review) => {
      sum += review.rating;
    });
    return sum / productReviews!.length;
  };

  const handleAddReview = async (e: FormEvent<HTMLFormElement>) => {
    -e.preventDefault();

    if (rating === 0 || reviewText === "") return;

    const reviewRequest: ReviewRequest = {
      customerId: customerId,
      productId: productId,
      rating: rating,
      reviewText: reviewText,
    };

    try {
      const res = await createReviewForProduct(reviewRequest).unwrap();

      if (res) {
        setRating(0);
        setReviewText("");
        setShowModal(false);

        setProductReviews([...productReviews!, res]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReviewForProduct({
        productId: productId,
        reviewId: reviewId,
      });

      const updatedReviews = productReviews?.filter(
        (review) => review.reviewId !== reviewId
      );

      setProductReviews(updatedReviews);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-start items-start w-full mt-10">
      <div className="flex flex-row justify-between items-center w-full border-b border-b-gray-200">
        <span className="flex items-center text-xl font-medium mb-2">
          Reviews
          <span className="text-sm text-gray-400 ml-2">
            ({productReviews?.length})
          </span>
        </span>
        {!validation && (
          <button
            className="text-sm text-primary"
            onClick={() => setShowModal(true)}
          >
            Add Review
          </button>
        )}
      </div>
      <div className="flex flex-row justify-start items-center w-full mt-4">
        <span className="text-sm text-gray-400 mr-2">Rating:</span>
        <Rating
          style={{ maxWidth: 100 }}
          value={calculateAverageRating()}
          readOnly
        />
        {calculateAverageRating() !== 0 && (
          <span className="text-sm text-gray-400 ml-2">
            {calculateAverageRating().toFixed(1)}/5.0
          </span>
        )}
      </div>
      <div className="flex flex-col justify-start items-start w-full mt-4 space-y-4">
        {productReviews?.length === 0 ? (
          <span className="text-sm text-gray-400">No reviews yet</span>
        ) : (
          productReviews?.map((review) => (
            <div
              key={review.reviewId}
              className="flex justify-start items-start w-full border-b border-b-gray-200 pb-4"
            >
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={review.customer.profilePicture}
                alt="profile"
                onClick={() => navigate(`/user/${review.customer.customerId}`)}
              />
              <div className="flex flex-col justify-start items-start w-full ml-2 space-y-0.5">
                <span
                  className="text-sm font-medium cursor-pointer"
                  onClick={() =>
                    navigate(`/user/${review.customer.customerId}`)
                  }
                >
                  @{review.customer.username}
                </span>
                <Rating
                  style={{ maxWidth: 100 }}
                  value={review.rating}
                  readOnly
                />
                <span className="text-sm text-gray-400">
                  {review.reviewText}
                </span>
                <span className="text-sm text-gray-400">
                  {convertDate(review.reviewDate)}
                </span>
              </div>
              {review.customer.customerId === customerId && (
                <div className="flex space-x-4 justify-start items-start ml-2">
                  <MdDeleteOutline
                    className="text-gray-400 cursor-pointer hover:text-red-500"
                    size={20}
                    onClick={() => handleDeleteReview(review.reviewId)}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <form
          className="flex flex-col justify-start items-start w-full"
          onSubmit={handleAddReview}
        >
          <span className="text-xl font-medium mb-2">Add Review</span>
          <textarea
            className="w-full h-40 border border-gray-300 rounded-md p-2"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <div className="flex flex-row justify-start items-center w-full mt-2">
            <span className="text-sm text-gray-400 mr-2">Rating:</span>
            <Rating
              style={{ maxWidth: 100 }}
              value={rating}
              onChange={setRating}
            />
            {rating !== 0 && (
              <span className="text-sm text-gray-400 ml-2">{rating}/5</span>
            )}
          </div>
          <span className="text-sm text-gray-400 mt-2">
            Your review will be public and your username will be displayed with
            your review.
          </span>
          <div className="flex flex-row justify-end items-center w-full mt-2">
            <button
              className="bg-white text-primary rounded-md px-4 py-2 mt-2"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="bg-primary text-white rounded-md px-4 py-2 mt-2"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
