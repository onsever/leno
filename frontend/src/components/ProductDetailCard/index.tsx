import { Button } from "../index.tsx";
import { ProductDetail } from "../../types";
import { AiOutlineHeart } from "react-icons/ai";
import {
  useAddProductToWishlistByCustomerIdMutation,
  useGetWishlistByCustomerIdQuery,
  useRemoveProductFromWishlistByCustomerIdMutation,
} from "../../redux/features/wishlist/wishlistFeature.ts";
import { useNavigate } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetCartItemsQuery,
} from "../../redux/features/cart/cartFeature.ts";

interface ProductDetailCardProps {
  product?: ProductDetail;
  validation: boolean;
  currentCustomerId?: number;
}

export default function ProductDetailCard({
  product,
  validation,
  currentCustomerId,
}: ProductDetailCardProps) {
  const navigate = useNavigate();
  const [addProductToWishlistByCustomerId] =
    useAddProductToWishlistByCustomerIdMutation();
  const [removeProductFromWishlistByCustomerId] =
    useRemoveProductFromWishlistByCustomerIdMutation();
  const { data: wishlist } = useGetWishlistByCustomerIdQuery(
    currentCustomerId!
  );
  const [addToCart] = useAddToCartMutation();
  const { data: cartItems } = useGetCartItemsQuery(currentCustomerId!);

  const handleAddProductToWishlist = async () => {
    if (currentCustomerId) {
      await addProductToWishlistByCustomerId({
        customerId: currentCustomerId,
        productId: product!.productId,
      });

      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  const handleRemoveProductFromWishlist = async () => {
    if (currentCustomerId) {
      removeProductFromWishlistByCustomerId({
        customerId: currentCustomerId,
        productId: product!.productId,
      });

      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  const checkIfProductIsInCart = () => {
    return cartItems?.some(
      (cartItem) => cartItem.product.productId === product?.productId
    );
  };

  const handleAddProductToCart = async () => {
    if (currentCustomerId) {
      if (checkIfProductIsInCart()) {
        return;
      }

      await addToCart({
        customerId: currentCustomerId,
        productId: product!.productId,
      });

      window.location.reload();
    } else {
      navigate("/login");
    }
  };

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
          disabled={validation || checkIfProductIsInCart()}
        >
          <span className="text-sm" onClick={handleAddProductToCart}>
            {checkIfProductIsInCart() ? "Added to Cart" : "Add to Cart"}
          </span>
        </Button>
        {validation ? (
          <></>
        ) : wishlist?.some(
            (wishlistItem) => wishlistItem.productId === product?.productId
          ) ? (
          <div className="flex w-full items-center mt-4 cursor-pointer text-gray-500 hover:text-red-500">
            <AiOutlineHeart className="text-2xl" />
            <span
              className="text-sm ml-2"
              onClick={handleRemoveProductFromWishlist}
            >
              Remove from Wishlist
            </span>
          </div>
        ) : (
          <div className="flex w-full items-center mt-4 cursor-pointer text-gray-500 hover:text-primary">
            <AiOutlineHeart className="text-2xl" />
            <span className="text-sm ml-2" onClick={handleAddProductToWishlist}>
              Add to Wishlist
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
