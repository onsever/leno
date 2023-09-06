import { Dispatch, SetStateAction, useState } from "react";
import { Shipper } from "../../types";
import { FaUps, FaFedex } from "react-icons/fa";

interface OrderShippingMethodProps {
  onShippingChange: Dispatch<SetStateAction<Shipper | undefined>>;
  shippers?: Shipper[];
}

export default function OrderShippingMethod({
  onShippingChange,
  shippers,
}: OrderShippingMethodProps) {
  const [selectedShipping, setSelectedShipping] = useState<number>(
    shippers![0].shipperId
  );

  const handleShippingChange = (option: Shipper) => {
    setSelectedShipping(option.shipperId);
    onShippingChange(option);
  };

  return (
    <div className="flex flex-col border-b border-gray-300 py-3">
      <h1 className="text-lg font-medium mb-5 mt-4">
        4. Select shipping method
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shippers?.map((option: Shipper) => (
          <label
            key={option.shipperId}
            className={`flex items-center p-4 border rounded-lg cursor-pointer ${
              selectedShipping === option.shipperId
                ? "border-primary"
                : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="shippingMethod"
              value={option.shipperId}
              checked={selectedShipping === option.shipperId}
              onChange={() => handleShippingChange(option)}
              className="form-radio h-5 w-5 text-primary"
            />
            <div className="ml-3 flex flex-col">
              <span className="text-lg font-medium">
                {option.name} Shipping
              </span>
              <span className="text-gray-500">${option.cost.toFixed(2)}</span>
            </div>
            <div className="ml-auto">
              {option.name === "Standard" ? (
                <FaUps size={30} />
              ) : (
                <FaFedex size={30} />
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
