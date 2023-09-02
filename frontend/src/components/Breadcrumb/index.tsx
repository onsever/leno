import { ProductDetail } from "../../types";

interface BreadcrumbProps {
  product?: ProductDetail;
}

export default function Breadcrumb({ product }: BreadcrumbProps) {
  const mainCategory = product?.categories.find(
    (category) =>
      category.name === "Men" ||
      category.name === "Women" ||
      category.name === "Kids"
  );

  const subCategory = product?.categories.find(
    (category) => category.name !== mainCategory?.name
  );

  return (
    <div className="flex items-center text-gray-500">
      <span>Home</span>
      <span className="mx-2">/</span>
      <span>Products</span>
      <span className="mx-2">/</span>
      <span>{mainCategory?.name}</span>
      <span className="mx-2">/</span>
      <span>{subCategory?.name}</span>
      <span className="mx-2">/</span>
      <span>{product?.name}</span>
    </div>
  );
}
