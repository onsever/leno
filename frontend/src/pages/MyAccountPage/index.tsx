import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { useGetCustomerByIdQuery } from "../../redux/features/customer/customerFeature.ts";
import { useGetProductsByCustomerIdQuery } from "../../redux/features/product/productFeature.ts";
import { tokenDecoder } from "../../utils/tokenDecoder.ts";
import { Loading, ProductCard } from "../../components";
import {
  useGetWishlistByCustomerIdQuery,
  useRemoveProductFromWishlistByCustomerIdMutation,
} from "../../redux/features/wishlist/wishlistFeature.ts";
import { useLocation } from "react-router-dom";
import { BsTrash } from "react-icons/bs";

export default function MyAccountPage() {
  const token = useSelector((state: RootState) => state.auth.token);
  const customerId = tokenDecoder(token)?.customerId;
  const { data: customer, isLoading } = useGetCustomerByIdQuery(customerId!);
  const { data: products } = useGetProductsByCustomerIdQuery(customerId!);
  const { data: wishlist } = useGetWishlistByCustomerIdQuery(customerId!);
  const [removeProductFromWishlist] =
    useRemoveProductFromWishlistByCustomerIdMutation();

  const location = useLocation();

  const [activeTab, setActiveTab] = useState<"products" | "favorites">(
    "products"
  );

  const handleRemoveProductFromWishlist = async (productId: number) => {
    try {
      await removeProductFromWishlist({
        customerId: customerId!,
        productId: productId,
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tab = query.get("tab");
    if (tab === "favorites") {
      setActiveTab("favorites");
    }
  }, [location]);

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
                <span className="text-3xl">{wishlist?.length}</span>
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
            ) : wishlist?.length ? (
              <div className="grid grid-cols-4 gap-8">
                {wishlist?.map((product) => (
                  <div key={product.productId} className="relative">
                    <ProductCard product={product} />
                    <div className="absolute top-2 right-2">
                      <BsTrash
                        className="text-3xl w-8 h-8 text-white cursor-pointer hover:scale-110 bg-red-500 rounded-full p-1.5"
                        onClick={() =>
                          handleRemoveProductFromWishlist(product.productId)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
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
