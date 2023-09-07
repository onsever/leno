import { Category, ProductDetail } from "../types";

export const mapCategories = (
  products: ProductDetail[] | undefined,
  queryParams: URLSearchParams
) => {
  const renamedCategories: Category[] = [];

  products?.forEach((product: ProductDetail) => {
    product.categories.forEach((cat: Category) => {
      const mainCategory = queryParams.get("main");
      const subCategory = queryParams.get("sub");

      if (mainCategory && subCategory) {
        if (
          cat.name.toLowerCase().startsWith(mainCategory) ||
          cat.name.toLowerCase().startsWith(subCategory)
        ) {
          renamedCategories.push(cat);
        }
      }

      if (mainCategory && !subCategory) {
        if (cat.name.toLowerCase().startsWith(mainCategory)) {
          renamedCategories.push(cat);
        }
      }
    });
  });

  return Array.from(
    new Set(renamedCategories.map((category) => category.name))
  );
};

export const mapSubCategories = (
  products: ProductDetail[] | undefined,
  queryParams: URLSearchParams
) => {
  const renamedCategories: Category[] = [];

  products?.forEach((product: ProductDetail) => {
    product.categories.forEach((cat: Category) => {
      const subCategory = queryParams.get("sub");

      if (subCategory) {
        if (cat.name.toLowerCase().startsWith(subCategory)) {
          renamedCategories.push(cat);
        }
      }
    });
  });

  return Array.from(
    new Set(renamedCategories.map((category) => category.name))
  );
};
