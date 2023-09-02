import { Button } from "../index.tsx";
import { ProductDetail } from "../../types";
import { AiOutlineHeart } from "react-icons/ai";

interface ProductDetailCardProps {
  product?: ProductDetail;
  validation: boolean;
}

export default function ProductDetailCard({
  product,
  validation,
}: ProductDetailCardProps) {
  return (
    <div className="flex justify-center items-center w-full mt-10">
      <div className="flex justify-center items-center w-full h-96">
        <img
          src={product?.image}
          alt="product"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col justify-start items-start w-full mt-2">
        <span className="block text-2xl font-bold mb-2">{product?.name}</span>
        <span className="block text-xl font-bold mb-4">${product?.price}</span>
        <span className="text-sm">Description:</span>
        <span className="text-sm text-gray-500">{product?.description}</span>
        <span className="block text-sm mt-4">Category:</span>
        {product?.categories.map((category) => (
          <span key={category.categoryId} className="text-sm text-gray-500">
            {category.name}
          </span>
        ))}
        <Button
          className="mt-4 w-1/2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={validation}
        >
          <span className="text-sm">Add to cart</span>
        </Button>
        <div className="flex w-full items-center mt-4 cursor-pointer text-gray-500 hover:text-primary">
          <AiOutlineHeart className="text-2xl" />
          <span className="text-sm ml-2">Add to Wishlist</span>
        </div>
      </div>
    </div>
  );
}
