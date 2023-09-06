import { useNavigate } from "react-router-dom";
import { ProductDetail } from "../../types";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

interface FeedProductCardProps {
  product: ProductDetail;
}

export default function FeedProductCard({ product }: FeedProductCardProps) {
  const navigate = useNavigate();

  const calculateAverageRating = () => {
    if (product.reviews.length === 0) return 0;

    let sum = 0;
    product.reviews.forEach((review) => {
      sum += review.rating;
    });
    return sum / product.reviews.length;
  };

  const handleProductClick = () => {
    navigate(`/products/${product.productId}`);
  };

  return (
    <div
      className="flex flex-col border border-gray-300 rounded-md p-4 cursor-pointer hover:bg-gray-50"
      onClick={handleProductClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={product.customer.profilePicture}
            alt={product.customer.firstName}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col ml-2 text-sm">
            <span className="block ml-2">{product.customer.firstName}</span>
            <span className="block ml-2 text-gray-500">
              @{product.customer.username}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 mt-4">
        <img src={product.image} alt={product.name} className="flex-1 mb-4" />
        <p className="font-medium">{product.name}</p>
        <p>${product.price}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <Rating
            style={{
              maxWidth: 100,
            }}
            value={calculateAverageRating()}
            readOnly
          />
          <span className="text-gray-500 text-sm ml-2">
            {calculateAverageRating().toFixed(1)}
          </span>
        </div>
        <span className="text-gray-500 text-sm">
          {product.reviews.length} reviews
        </span>
      </div>
    </div>
  );
}
