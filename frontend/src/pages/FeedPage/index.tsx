import { useEffect } from "react";
import { useGetAllProductsQuery } from "../../redux/features/product/productFeature.ts";
import { FeedProductCard, Loading } from "../../components";

export default function FeedPage() {
  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(0, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    document.title = "Secondhand fashion on Leno | Leno";
  }, []);

  if (isLoading || isFetching) return <Loading />;

  return (
    <section className="flex flex-col mx-auto w-[1120px] py-10 pb-32">
      <h1 className="text-2xl font-medium mb-4">Feed</h1>
      <div className="grid grid-cols-4 gap-4">
        {products?.map((product) => (
          <FeedProductCard product={product} key={product.productId} />
        ))}
      </div>
    </section>
  );
}
