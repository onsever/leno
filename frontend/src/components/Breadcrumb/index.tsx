import { useNavigate } from "react-router-dom";
import { ProductDetail } from "../../types";

interface BreadcrumbProps {
  product?: ProductDetail;
}

export default function Breadcrumb({ product }: BreadcrumbProps) {
  const navigate = useNavigate();

  const mainCategory = product?.categories.find(
    (category) =>
      category.name === "Men" ||
      category.name === "Women" ||
      category.name === "Kids"
  );

  const subCategory = product?.categories.find(
    (category) => category.name !== mainCategory?.name
  );

  const renameCategory = (category: string) => {
    return category.split(" ")[0].toLowerCase();
  };

  return (
    <div className="flex items-center text-gray-500">
      <span
        className="cursor-pointer hover:underline"
        onClick={() => navigate("/")}
      >
        Home
      </span>
      <span className="mx-2">/</span>
      <span
        className="cursor-pointer hover:underline"
        onClick={() => navigate("/feed")}
      >
        Products
      </span>
      <span className="mx-2">/</span>
      <span
        className="cursor-pointer hover:underline"
        onClick={() => navigate(`/${renameCategory(mainCategory!.name)}`)}
      >
        {mainCategory?.name}
      </span>
      <span className="mx-2">/</span>
      <span
        className="cursor-pointer hover:underline"
        onClick={() =>
          navigate(
            `/${renameCategory(mainCategory!.name)}?sub=${renameCategory(
              subCategory!.name
            )}`
          )
        }
      >
        {subCategory?.name}
      </span>
      <span className="mx-2">/</span>
      <span>{product?.name}</span>
    </div>
  );
}
