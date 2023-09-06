import { useState, useEffect } from "react";
import { useGetCartItemsQuery } from "../../redux/features/cart/cartFeature.ts";
import { Loading } from "../../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store.ts";
import { tokenDecoder } from "../../utils/tokenDecoder.ts";
import OrderAddress from "./OrderAddress.tsx";
import OrderProduct from "./OrderProduct.tsx";
import OrderPaymentMethod from "./OrderPaymentMethod.tsx";
import OrderShippingMethod from "./OrderShippingMethod.tsx";
import OrderSummary from "./OrderSummary.tsx";
import { Address, OrderRequest, Product, Shipper } from "../../types";
import { useGetAllAddressesFromCustomerQuery } from "../../redux/features/address/addressFeature.ts";
import { useGetAllShippersQuery } from "../../redux/features/shipper/shipperFeature.ts";
import { useCreateOrderMutation } from "../../redux/features/order/orderFeature.ts";
import { useDeleteCartItemMutation } from "../../redux/features/cart/cartFeature.ts";

export default function CheckoutPage() {
  const navigate = useNavigate();

  // Authenticated customer id
  const token = useSelector((state: RootState) => state.auth.token);
  const decodedToken = tokenDecoder(token)!;
  const authenticatedCustomerId = decodedToken.customerId!;

  // Queries
  const [createOrder] = useCreateOrderMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
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
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);

  const [currentShippingOption, setCurrentShippingOption] = useState<
    Shipper | undefined
  >(undefined);

  const clearCartItems = async () => {
    cartItems!.forEach(async (item) => {
      await deleteCartItem(item.cartItemId).unwrap();
    });
  };

  const handlePlaceOrder = async () => {
    if (!orderAddress || !currentShippingOption) {
      return;
    }

    setIsPlacingOrder(true);

    const { shippingAddress, billingAddress } = orderAddress;
    const { shipperId } = currentShippingOption;

    const products: Product[] = cartItems!.map((item) => ({
      productId: item.product.productId,
      name: item.product.name,
      description: item.product.description,
      image: item.product.image,
      price: item.product.price,
    }));

    const orderRequest: OrderRequest = {
      customerId: authenticatedCustomerId,
      shippingAddressId: shippingAddress.addressId,
      billingAddressId: billingAddress.addressId,
      shipperId: shipperId,
      totalAmount: totalAmount,
      products: products,
    };

    try {
      await createOrder(orderRequest).unwrap();
      setIsPlacingOrder(false);
      await clearCartItems();
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      setIsPlacingOrder(false);
    }
  };

  useEffect(() => {
    if (isShippingData && shippers) {
      setCurrentShippingOption(shippers[0]);
    }
  }, [isShippingData, shippers]);

  // If no cart items, redirect to feed
  useEffect(() => {
    if (cartItems && cartItems.length === 0) {
      navigate("/feed");
    }
  }, [cartItems]);

  if (isLoading || isAddressesLoading || isShippersLoading) {
    return <Loading />;
  }

  return (
    <section className="mx-auto w-[1120px] py-10">
      <h1 className="text-2xl font-medium mb-5">Checkout</h1>
      <div className="flex flex-col relative">
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
        {isPlacingOrder && (
          <div className="absolute inset-0 bg-white flex items-center justify-center">
            <Loading />
          </div>
        )}
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
