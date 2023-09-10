import { useLocation, useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/product/productFeature.ts";
import { FeedProductCard, Loading } from "../../components";
import { Category, ProductDetail } from "../../types";
import { mapSubCategories } from "../../utils/mapCategories.ts";

export default function FilteringPages() {
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(0, {
    refetchOnMountOrArgChange: true,
  });

  const filterByMainCategory = products?.filter((product: ProductDetail) => {
    return product.categories.some(
      (cat: Category) => cat.name.toLowerCase() === category
    );
  });

  const filterBySubCategory = filterByMainCategory?.filter(
    (product: ProductDetail) => {
      return product.categories.some(
        (cat: Category) =>
          cat.name === mapSubCategories(products, queryParams)[0]
      );
    }
  );

  if (isLoading || isFetching) return <Loading />;

  return (
    <section className="flex flex-col mx-auto w-[1120px] py-10 pb-32">
      <h1 className="text-2xl font-medium mb-4">
        <span>
          {filterBySubCategory?.length === 0
            ? filterByMainCategory?.length
            : filterBySubCategory?.length}
        </span>{" "}
        <span>products found for </span>
        <span className="capitalize">{category}</span>
        <span>
          {queryParams.get("sub") && " - "}
          {queryParams.get("sub") && mapSubCategories(products, queryParams)[0]}
        </span>
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {queryParams.get("sub") ? (
          filterBySubCategory?.length === 0 ? (
            <div className="col-span-4 flex justify-center items-center">
              <p className="text-2xl font-medium">
                No products found with this subcategory
              </p>
            </div>
          ) : (
            filterBySubCategory?.map((product: ProductDetail) => (
              <FeedProductCard product={product} key={product.productId} />
            ))
          )
        ) : filterByMainCategory?.length === 0 ? (
          <div className="col-span-4 flex justify-center items-center">
            <p className="text-2xl font-medium">
              No products found with this category
            </p>
          </div>
        ) : (
          filterByMainCategory?.map((product: ProductDetail) => (
            <FeedProductCard product={product} key={product.productId} />
          ))
        )}
      </div>
    </section>
  );
}
