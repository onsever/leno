import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../../redux/features/product/productFeature.ts";
import {
  Breadcrumb,
  Loading,
  OtherProductsFromSeller,
  ProductDetailCard,
  ReviewCard,
  SellerCard,
} from "../../components";
import { RootState } from "../../redux/store.ts";
import { tokenDecoder } from "../../utils/tokenDecoder.ts";

export default function SingleProductPage() {
  const { productId } = useParams();
  const token = useSelector((state: RootState) => state.auth.token);
  const customerId = tokenDecoder(token)?.customerId;

  const { data: product, isLoading } = useGetProductByIdQuery(
    Number(productId)
  );

  const checkIfProductBelongsToTheSeller = () => {
    return product?.customer.customerId === customerId;
  };

  if (isLoading) return <Loading />;

  return (
    <section className="flex flex-col mx-auto w-[1120px] py-10">
      <Breadcrumb product={product} />
      <ProductDetailCard
        product={product}
        validation={checkIfProductBelongsToTheSeller()}
        currentCustomerId={customerId}
      />
      <div className="flex flex-col justify-start items-start w-full mt-10">
        <ReviewCard
          reviews={product?.reviews}
          productId={Number(productId)}
          customerId={Number(customerId)}
          validation={checkIfProductBelongsToTheSeller()}
        />
        <SellerCard product={product} />
        <OtherProductsFromSeller
          customerId={product?.customer.customerId}
          currentProductId={product?.productId}
          sellerUsername={product?.customer.username}
        />
      </div>
    </section>
  );
}
