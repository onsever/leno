import { useEffect, useRef } from "react";
import {
  useGetCartItemsQuery,
  useDeleteCartItemMutation,
} from "../../redux/features/cart/cartFeature.ts";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";

interface CartSidebarProps {
  onClose: () => void;
  authenticatedCustomerId: number;
}

export default function CartSidebar({
  onClose,
  authenticatedCustomerId,
}: CartSidebarProps) {
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const {
    data: cartItems,
    isLoading,
    refetch,
  } = useGetCartItemsQuery(authenticatedCustomerId, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteCartItem] = useDeleteCartItemMutation();

  const products = cartItems?.map((item) => item.product);

  const calculateTotal = () => {
    let total = 0;
    products?.forEach((product) => {
      total += product.price;
    });

    return total;
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleDeleteCartItem = async (cartItemId: number) => {
    await deleteCartItem(cartItemId);

    refetch();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  if (isLoading) return <Loading />;

  return (
    <div
      ref={sidebarRef}
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {/* Cart Items */}
      <div className="flex flex-col space-y-4 p-4">
        <span className="text-xl font-medium">Cart</span>
        <div className="flex flex-col space-y-4">
          {cartItems?.map((cartItem) => (
            <div
              key={cartItem.product.productId}
              className="flex space-x-4 justify-between items-center border border-gray-200 p-2 rounded-md cursor-pointer hover:bg-gray-100"
            >
              <div
                className="flex items-center space-x-2"
                onClick={() =>
                  navigate(`/products/${cartItem.product.productId}`)
                }
              >
                <img
                  src={cartItem.product.image}
                  alt="product"
                  className="w-12 h-12 object-contain rounded-full"
                />
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium">
                    {cartItem.product.name}
                  </span>
                  <span className="text-sm">${cartItem.product.price}</span>
                </div>
              </div>
              <BsTrash
                className="w-5 h-5 text-gray-400 hover:text-red-500"
                onClick={() => handleDeleteCartItem(cartItem.cartItemId)}
              />
            </div>
          ))}
          {cartItems?.length === 0 && (
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xl font-medium">🤔</span>
              <span className="text-sm text-gray-400">No items in cart</span>
            </div>
          )}
          <span className="text-sm">
            Total:{" "}
            <span className="font-medium">${calculateTotal().toFixed(2)}</span>
          </span>
          {cartItems && cartItems?.length > 0 && (
            <button
              className="bg-primary text-white py-2 rounded-md"
              onClick={() => {
                navigate("/checkout");
                onClose();
              }}
            >
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
