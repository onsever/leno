import { CartItem, Shipper } from "../../types";
import { Dispatch, SetStateAction, useEffect } from "react";

interface OrderSummaryProps {
  cartItems: CartItem[];
  shippers?: Shipper[];
  selectedShipping: number | undefined;
  setTotalAmount: Dispatch<SetStateAction<number>>;
}

export default function OrderSummary({
  cartItems,
  shippers,
  selectedShipping,
  setTotalAmount,
}: OrderSummaryProps) {
  const subtotal = cartItems
    ? cartItems.reduce((acc, item) => acc + item.product.price, 0)
    : 0;
  const shippingCost = shippers?.find(
    (option) => option.shipperId === selectedShipping
  )?.cost;
  const totalAmount = subtotal + (shippingCost || 0);

  useEffect(() => {
    setTotalAmount(Number(totalAmount.toFixed(2)));
  }, [totalAmount, setTotalAmount]);

  return (
    <div className="flex flex-col border-b border-gray-300 py-3">
      <h1 className="text-lg font-medium mb-5 mt-4">5. Order summary</h1>
      <div className="flex justify-between mb-3">
        <span className="text-gray-600">Subtotal:</span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-3">
        <span className="text-gray-600">Shipping:</span>
        <span className="font-medium">${shippingCost?.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Total:</span>
        <span className="font-medium">${totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
}
