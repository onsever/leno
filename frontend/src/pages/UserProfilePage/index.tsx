import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCustomerByIdQuery } from "../../redux/features/customer/customerFeature.ts";
import { useGetProductsByCustomerIdQuery } from "../../redux/features/product/productFeature.ts";
import { Loading, ProductCard } from "../../components";

export default function UserProfilePage() {
  const { customerId } = useParams();
  const { data: customer, isLoading } = useGetCustomerByIdQuery(
    Number(customerId)
  );
  const { data: products } = useGetProductsByCustomerIdQuery(
    Number(customerId)
  );

  const [activeTab, setActiveTab] = useState<"products" | "favorites">(
    "products"
  );

  if (isLoading) return <Loading />;

  return (
    <div className="bg-[#F5F6F7] pt-40">
      <div className="rounded-tr-2xl rounded-tl-2xl bg-white">
        <div className="flex flex-col mx-auto w-[1120px] relative">
          <img
            src={customer?.profilePicture}
            alt="avatar"
            className="w-40 h-40 rounded-full absolute border-4 border-white -top-20 left-1/2 transform -translate-x-1/2"
          />
          <div className="flex flex-col justify-center items-center w-full pt-24">
            <h1 className="text-2xl font-bold">{customer?.firstName}</h1>
            <span className="text-gray-500">@{customer?.username}</span>
          </div>
          <div className="flex items-center justify-around w-full">
            <div
              className="flex flex-col justify-center items-center w-full pt-14 cursor-pointer"
              onClick={() => setActiveTab("products")}
            >
              <div
                className={
                  activeTab === "products"
                    ? "flex flex-col items-center justify-center border-b-4 border-b-primary"
                    : "flex flex-col items-center justify-center text-gray-500"
                }
              >
                <span className="text-3xl">{products?.length}</span>
                <span className="mt-2 pb-2">Products</span>
              </div>
            </div>
            <div
              className="flex flex-col justify-center items-center w-full pt-14 cursor-pointer"
              onClick={() => setActiveTab("favorites")}
            >
              <div
                className={
                  activeTab === "favorites"
                    ? "flex flex-col items-center justify-center border-b-4 border-b-primary"
                    : "flex flex-col items-center justify-center text-gray-500"
                }
              >
                <span className="text-3xl">0</span>
                <span className="mt-2 pb-2">Favorites</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full pt-14 pb-32">
            {activeTab === "products" ? (
              products?.length ? (
                <div className="grid grid-cols-4 gap-8">
                  {products?.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center w-full">
                  <span className="text-3xl">😯</span>
                  <span className="mt-2 text-2xl">No items for sale</span>
                  <p className="mt-2 text-gray-500">
                    This member does not have any items for sale. Please come
                    back later.
                  </p>
                </div>
              )
            ) : (
              <div className="flex flex-col justify-center items-center w-full">
                <span className="text-3xl">💔</span>
                <span className="mt-2 text-2xl">No favourite items yet.</span>
                <p className="mt-2 text-gray-500">
                  This member hasn't favourited any items yet. Please come back
                  later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
