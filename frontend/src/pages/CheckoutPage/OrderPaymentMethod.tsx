import { FaApple, FaCreditCard, FaPaypal } from "react-icons/fa";
import { useState } from "react";

export default function OrderPaymentMethod() {
  const [selectedPayment, setSelectedPayment] = useState("paypal");

  const paymentOptions = [
    {
      id: "creditCard",
      name: "Credit Card",
      icon: <FaCreditCard />,
      isAvailable: false,
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <FaPaypal />,
      isAvailable: true,
    },
    {
      id: "applePay",
      name: "Apple Pay",
      icon: <FaApple />,
      isAvailable: false,
    },
  ];

  return (
    <div className="flex flex-col border-b border-gray-300 py-3">
      <h1 className="text-lg font-medium mb-5">3. Select payment method</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paymentOptions.map((option) => (
          <label
            key={option.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer ${
              selectedPayment === option.id
                ? "border-primary"
                : "border-gray-300"
            } ${!option.isAvailable && "bg-gray-100"}`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={option.id}
              checked={selectedPayment === option.id}
              onChange={() => setSelectedPayment(option.id)}
              className="form-radio h-5 w-5 text-primary"
              disabled={!option.isAvailable}
            />
            <div className="ml-3 flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="text-lg font-medium">{option.name}</span>
                {!option.isAvailable && (
                  <span className="text-sm text-gray-500">
                    Currently not available
                  </span>
                )}
              </div>
              {option.icon}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
