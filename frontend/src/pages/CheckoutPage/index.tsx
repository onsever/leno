import { useState, useEffect } from "react";
import { useGetCartItemsQuery } from "../../redux/features/cart/cartFeature.ts";
import { Loading } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { tokenDecoder } from "../../utils/tokenDecoder.ts";
import OrderAddress from "./OrderAddress.tsx";
import OrderProduct from "./OrderProduct.tsx";
import OrderPaymentMethod from "./OrderPaymentMethod.tsx";
import OrderShippingMethod from "./OrderShippingMethod.tsx";
import OrderSummary from "./OrderSummary.tsx";
import { Address, Shipper } from "../../types";
import { useGetAllAddressesFromCustomerQuery } from "../../redux/features/address/addressFeature.ts";
import { useGetAllShippersQuery } from "../../redux/features/shipper/shipperFeature.ts";

export default function CheckoutPage() {
  // Authenticated customer id
  const token = useSelector((state: RootState) => state.auth.token);
  const decodedToken = tokenDecoder(token)!;
  const authenticatedCustomerId = decodedToken.customerId!;

  // Queries
  const { data: cartItems, isLoading } = useGetCartItemsQuery(
    authenticatedCustomerId
  );
  const { data: addresses, isLoading: isAddressesLoading } =
    useGetAllAddressesFromCustomerQuery(authenticatedCustomerId);
  const {
    data: shippers,
    isLoading: isShippersLoading,
    isSuccess: isShippingData,
  } = useGetAllShippersQuery();

  // State
  const [orderAddress, setOrderAddress] = useState<{
    shippingAddress: Address;
    billingAddress: Address;
  } | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const [currentShippingOption, setCurrentShippingOption] = useState<
    Shipper | undefined
  >(undefined);

  const handlePlaceOrder = () => {
    console.log("Place order");
    console.log(orderAddress);
    console.log(totalAmount);
  };

  useEffect(() => {
    if (isShippingData && shippers) {
      setCurrentShippingOption(shippers[0]);
    }
  }, [isShippingData, shippers]);

  if (isLoading || isAddressesLoading || isShippersLoading) {
    return <Loading />;
  }

  return (
    <section className="mx-auto w-[1120px] py-10">
      <h1 className="text-2xl font-medium mb-5">Checkout</h1>
      <div className="flex flex-col">
        <OrderAddress addresses={addresses} setOrderAddress={setOrderAddress} />
        <OrderProduct cartItems={cartItems!} />
        <OrderPaymentMethod />
        <OrderShippingMethod
          onShippingChange={setCurrentShippingOption}
          shippers={shippers}
        />
        <OrderSummary
          cartItems={cartItems!}
          shippers={shippers}
          selectedShipping={currentShippingOption?.shipperId}
          setTotalAmount={setTotalAmount}
        />
        <button
          className="bg-primary text-white py-3 rounded-lg font-medium text-lg mt-4 hover:bg-opacity-90 transition duration-300"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </section>
  );
}
