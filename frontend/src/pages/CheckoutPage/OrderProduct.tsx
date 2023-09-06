import { CartItem } from "../../types";

interface OrderProductProps {
  cartItems: CartItem[];
}

export default function OrderProduct({ cartItems }: OrderProductProps) {
  return (
    <div className="flex flex-col py-3">
      <h1 className="text-lg font-medium mb-5 mt-4">
        2. Review products and shipping
      </h1>
      {cartItems?.map((item: CartItem) => (
        <div
          key={item.product.productId}
          className="flex items-center border-b border-gray-300 py-4"
        >
          <div className="flex-shrink-0 w-16 h-16">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
          <div className="flex-grow ml-4">
            <h2 className="text-lg font-medium text-gray-800">
              {item.product.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {item.product.description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <p className="text-lg font-medium text-gray-800">
              ${item.product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
