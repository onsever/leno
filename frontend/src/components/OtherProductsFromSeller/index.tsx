import { useGetProductsByCustomerIdQuery } from "../../redux/features/product/productFeature.ts";
import { ProductCard } from "../../components";

interface OtherProductsFromSellerProps {
  customerId?: number | null | undefined;
  currentProductId?: number | null | undefined;
  sellerUsername?: string | null | undefined;
}

export default function OtherProductsFromSeller({
  customerId,
  currentProductId,
  sellerUsername,
}: OtherProductsFromSellerProps) {
  const { data: products } = useGetProductsByCustomerIdQuery(customerId!);

  const filterProducts = () => {
    return products?.filter(
      (product) => product.productId !== currentProductId
    );
  };

  return (
    <div className="flex flex-col justify-center w-full mt-10">
      <h1 className="text-xl font-medium">
        Other products from {sellerUsername}
      </h1>
      <div className="grid grid-cols-4 gap-4 w-full mt-4">
        {filterProducts()?.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
}
