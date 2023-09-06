import { FaReceipt, FaShippingFast } from "react-icons/fa";
import { Address } from "../../types";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Modal } from "../../components";

interface OrderAddressProps {
  addresses?: Address[];
  setOrderAddress: Dispatch<
    SetStateAction<{
      shippingAddress: Address;
      billingAddress: Address;
    } | null>
  >;
}

export default function OrderAddress({
  addresses,
  setOrderAddress,
}: OrderAddressProps) {
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<Address | null>(addresses![0] || null);

  const [selectedBillingAddress, setSelectedBillingAddress] =
    useState<Address | null>(addresses![0] || null);

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState<
    "billing" | "shipping"
  >("shipping");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleShippingAddressChange = (address: Address) => {
    setSelectedShippingAddress(address);
  };

  const handleBillingAddressChange = (address: Address) => {
    setSelectedBillingAddress(address);
  };

  const handleOnChange = (addressType: "billing" | "shipping") => {
    setCurrentSelectedAddress(addressType);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setOrderAddress({
      shippingAddress: selectedShippingAddress!,
      billingAddress: selectedBillingAddress!,
    });
  }, [selectedShippingAddress, selectedBillingAddress, setOrderAddress]);

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-medium mb-5">
        1. Choose a shipping and billing address
      </h1>
      <div className="flex flex-row justify-between items-center border-b border-gray-300 py-3">
        <div className="flex flex-row items-center">
          <div className="flex items-center w-10 h-10 bg-primary rounded-full mr-3">
            <FaShippingFast className="text-white text-xl mx-auto my-auto" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-medium">Shipping Address</h1>
            <p className="text-sm text-gray-500">
              {selectedShippingAddress?.street}
            </p>
            <p className="text-sm text-gray-500">
              {selectedShippingAddress?.city}, {selectedShippingAddress?.state}{" "}
              {selectedShippingAddress?.postalCode}
            </p>
            <p className="text-sm text-gray-500">
              {selectedShippingAddress?.country}
            </p>
          </div>
        </div>
        <button
          className="text-sm text-gray-500 hover:text-primary"
          onClick={() => handleOnChange("shipping")}
        >
          Change
        </button>
      </div>
      {/* Billing Address Selection */}
      <div className="flex flex-row justify-between items-center border-b border-gray-300 py-3">
        <div className="flex flex-row items-center">
          <div className="flex items-center w-10 h-10 bg-primary rounded-full mr-3">
            <FaReceipt className="text-white text-xl mx-auto my-auto" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-medium">Billing Address</h1>
            <p className="text-sm text-gray-500">
              {selectedBillingAddress?.street}
            </p>
            <p className="text-sm text-gray-500">
              {selectedBillingAddress?.city}, {selectedBillingAddress?.state}{" "}
              {selectedBillingAddress?.postalCode}
            </p>
            <p className="text-sm text-gray-500">
              {selectedBillingAddress?.country}
            </p>
          </div>
        </div>
        <button
          className="text-sm text-gray-500 hover:text-primary"
          onClick={() => handleOnChange("billing")}
        >
          Change
        </button>
      </div>
      {/* Modal */}
      <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center justify-center">
          {currentSelectedAddress === "shipping" ? (
            <div className="flex flex-col w-full">
              <h1 className="text-lg font-medium mb-5">Shipping Address</h1>
              {addresses?.map((address: Address) => (
                <label
                  key={address.addressId}
                  className="flex items-center justify-between border rounded-lg cursor-pointer mb-3 p-2"
                >
                  <div className="ml-3 flex flex-col">
                    <span className="text-lg font-medium">
                      {address.street}
                    </span>
                    <span className="text-gray-500">
                      {address.city}, {address.state} {address.postalCode}
                    </span>
                    <span className="text-gray-500">{address.country}</span>
                  </div>
                  <input
                    type="radio"
                    name="shippingAddress"
                    value={address.addressId}
                    checked={
                      selectedShippingAddress?.addressId === address.addressId
                    }
                    onChange={() => handleShippingAddressChange(address)}
                    className="form-radio h-5 w-5 text-primary"
                  />
                </label>
              ))}
            </div>
          ) : (
            <div className="flex flex-col w-full">
              <h1 className="text-lg font-medium mb-5">Billing Address</h1>
              {addresses?.map((address: Address) => (
                <label
                  key={address.addressId}
                  className="flex items-center justify-between border rounded-lg cursor-pointer mb-3 p-2"
                >
                  <div className="ml-3 flex flex-col">
                    <span className="text-lg font-medium">
                      {address.street}
                    </span>
                    <span className="text-gray-500">
                      {address.city}, {address.state} {address.postalCode}
                    </span>
                    <span className="text-gray-500">{address.country}</span>
                  </div>

                  <input
                    type="radio"
                    name="billingAddress"
                    value={address.addressId}
                    checked={
                      selectedBillingAddress?.addressId === address.addressId
                    }
                    onChange={() => handleBillingAddressChange(address)}
                    className="form-radio h-5 w-5 text-primary"
                  />
                </label>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
