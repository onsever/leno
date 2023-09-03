import { Product, ProductDetail } from "../../types";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: ProductDetail | Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${product.productId}`);
  };
  return (
    <div
      className="flex flex-col justify-between w-full h-full cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex justify-center items-center w-full h-60">
          <img
            src={product.image}
            alt="product"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-start w-full mt-2">
          <span className="text-lg font-bold">{product.name}</span>
          <span className="text-sm text-gray-500">{product.description}</span>
          <span className="text-lg font-bold">{product.price}$</span>
        </div>
      </div>
    </div>
  );
}
