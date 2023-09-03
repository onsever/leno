import { useNavigate } from "react-router-dom";
import { ProductDetail } from "../../types";

interface FeedProductCardProps {
  product: ProductDetail;
}

export default function FeedProductCard({ product }: FeedProductCardProps) {
  const navigate = useNavigate();

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
    </div>
  );
}
