import { useState } from "react";
import { useGetAllOrdersByCustomerIdQuery } from "../../redux/features/order/orderFeature.ts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store.ts";
import { tokenDecoder } from "../../utils/tokenDecoder.ts";
import { convertDate } from "../../utils/convertDate.ts";
import { Loading } from "../../components";
import { Order, Product } from "../../types";
import { FaFedex, FaUps } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function OrdersPage() {
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.auth.token);
  const decodedToken = tokenDecoder(token)!;
  const authenticatedCustomerId = decodedToken.customerId!;

  const { data: orders, isLoading } = useGetAllOrdersByCustomerIdQuery(
    authenticatedCustomerId
  );

  const [showOrderDetails, setShowOrderDetails] = useState<boolean>(false);

  const getStatusStyle = (status: string): string => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-400 text-yellow-800";
      case "SHIPPED":
        return "bg-blue-400 text-blue-800";
      case "DELIVERED":
        return "bg-green-400 text-green-800";
      case "CANCELLED":
        return "bg-red-400 text-red-800";
      default:
        return "bg-gray-400 text-gray-800";
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto w-[1120px] py-10">
      <h1 className="text-2xl font-medium mb-5">Orders</h1>
      <div className="space-y-8">
        {orders?.map((order: Order) => (
          <div
            key={order.orderId}
            className="bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50"
          >
            <div className="border-b border-gray-200 p-4 flex justify-between">
              <div className="flex flex-col">
                <div className="text-lg font-medium text-gray-700">
                  Order Number
                </div>
                <div className="text-gray-600">{order.orderNumber}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-medium text-gray-700">
                  Order Date
                </div>
                <div className="text-gray-600">
                  {convertDate(order.orderDate)}
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4 text-gray-600">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
                <div className="flex items-center">
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => setShowOrderDetails(!showOrderDetails)}
                  >
                    <IoIosArrowDown size={20} />
                  </button>
                </div>
              </div>
            </div>
            {showOrderDetails && (
              <div className="p-4">
                <h2 className="text-lg font-medium mb-2">Products</h2>
                {order.products.map((product: Product) => (
                  <div
                    key={product.productId}
                    className="flex items-center space-x-4 p-4 border-b border-gray-200"
                  >
                    <div className="w-16 h-16 relative cursor-pointer">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                        onClick={() =>
                          navigate(`/products/${product.productId}`)
                        }
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="text-lg font-medium text-gray-700">
                        {product.name}
                      </div>
                      <div className="text-gray-600">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex border-b border-b-gray-200">
                  <div className="flex-grow p-2 pb-4 items-start flex flex-col">
                    <h2 className="text-lg font-medium mb-2">
                      Billing Address
                    </h2>
                    <div className="text-gray-600 flex flex-col items-start">
                      <span className="block">
                        {order.billingAddress.street}
                      </span>
                      <span className="block">
                        {order.billingAddress.city},{" "}
                        {order.billingAddress.state}
                      </span>
                      <span className="block">
                        {order.billingAddress.postalCode},{" "}
                        {order.billingAddress.country}
                      </span>
                    </div>
                  </div>

                  <div className="w-px bg-gray-200"></div>

                  <div className="flex-grow p-2 pb-4 items-end flex flex-col">
                    <h2 className="text-lg font-medium mb-2">
                      Shipping Address
                    </h2>
                    <div className="text-gray-600 flex flex-col items-end">
                      <span className="block">
                        {order.shippingAddress.street}
                      </span>
                      <span className="block">
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                      </span>
                      <span className="block">
                        {order.shippingAddress.postalCode},{" "}
                        {order.shippingAddress.country}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-b border-b-gray-200">
                  <div className="flex-grow p-2 pb-4 items-start flex flex-col">
                    <h2 className="text-lg font-medium mb-2">Shipper</h2>
                    <div className="text-gray-600">
                      {order.shipper.name} - Cost: $
                      {order.shipper.cost.toFixed(2)}
                    </div>
                  </div>
                  <div className="">
                    {order.shipper.name === "Standard" ? (
                      <FaUps size={40} />
                    ) : (
                      <FaFedex size={40} />
                    )}
                  </div>
                </div>
                <div className="flex justify-between p-2">
                  <div className="text-lg font-medium pt-2">Total</div>
                  <div className="text-lg font-medium pt-2">
                    ${order.totalAmount.toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
