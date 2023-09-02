import { ChangeEvent, useState, FormEvent, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { tokenDecoder } from "../../utils/tokenDecoder.ts";
import { AiOutlinePlus, AiOutlineRedo } from "react-icons/ai";
import { Button, Input } from "../../components";
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryFeature.ts";
import { Category } from "../../types";
import { useUploadProductImageMutation } from "../../redux/features/file-upload/fileUploadFeature.ts";
import { useCreateProductForCustomerMutation } from "../../redux/features/product/productFeature.ts";
import { useAssignCategoryToProductMutation } from "../../redux/features/category/categoryFeature.ts";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProductForCustomer] = useCreateProductForCustomerMutation();
  const [assignCategoryToProduct] = useAssignCategoryToProductMutation();

  const navigate = useNavigate();

  const auth = useSelector((state: RootState) => state.auth);
  const customerId = tokenDecoder(auth.token)?.customerId;

  const productImageRef = useRef<HTMLInputElement | null>(null);

  const { data: categories } = useGetAllCategoriesQuery("");
  const filteredCategories = categories?.filter(
    (category: Category) =>
      category.name !== "Women" &&
      category.name !== "Men" &&
      category.name !== "Kids" &&
      category.name !== "Maternity"
  );

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    price: "",
    category: "Women",
    subCategory: "",
  });

  const [productImage, setProductImage] = useState<File | null>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productImage) return;

    try {
      const { title, description, price, subCategory } = inputs;

      const imageResponse = await uploadProductImage({
        file: productImage,
        customerId: customerId!,
      });

      const productResponse = await createProductForCustomer({
        customerId: customerId!,
        productInput: {
          name: title!,
          description: description!,
          price: Number(price!),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          image: imageResponse.error.data,
        },
      });

      console.log(productResponse);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const productIdFromResponse = productResponse.data?.productId;

      if (!productIdFromResponse) return;

      const categoryN = filteredCategories!.find(
        (category: Category) => category.name === subCategory
      );

      const mainCategory = categories!.find(
        (category: Category) => category.name === inputs.category
      );

      if (!categoryN) return;

      await assignCategoryToProduct({
        productId: productIdFromResponse!,
        categoryId: categoryN.categoryId,
      });

      await assignCategoryToProduct({
        productId: productIdFromResponse!,
        categoryId: mainCategory!.categoryId,
      });

      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F0F9FA]">
      <div className="w-[1120px] mx-auto py-10 flex flex-col items-center">
        <h1 className="text-4xl font-semibold">List item</h1>
        <p className="text-md text-gray-500 mt-6">
          Give your items a second life.
        </p>
        <div className="w-2/3 mt-12 bg-white shadow rounded-md p-7">
          {/* Image Container Start */}
          <div className="flex flex-col space-y-4">
            <p className="font-medium">
              Item image (please upload a good photo)
              <span className="text-red-500"> *</span>
            </p>
            <div className="border border-dashed border-gray-200 h-72 flex items-center justify-center">
              {productImage ? (
                <div className="w-full h-full relative">
                  <img
                    src={URL.createObjectURL(productImage)}
                    alt="product"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-1 right-1">
                    <button
                      className="bg-red-500 text-white rounded-full p-1"
                      onClick={() => setProductImage(null)}
                    >
                      <AiOutlineRedo className="text-3xl" />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex text-primary items-center justify-center border border-primary px-4 py-2 rounded-md space-x-2 hover:bg-gray-50 cursor-pointer">
                  <AiOutlinePlus className="text-3xl" />
                  <p className="text-md">Add photo</p>
                  <input
                    type="file"
                    name="productImage"
                    id="productImage"
                    className="hidden"
                    ref={productImageRef}
                    onChange={(e) => {
                      if (e.target.files) {
                        setProductImage(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              )}
            </div>
          </div>
          {/* Image Container End */}
          <form
            className="flex flex-col space-y-4 mt-6"
            onSubmit={handleOnSubmit}
          >
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                <label htmlFor="title">Title</label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="e.g. Nike Air Max 90"
                  value={inputs.title}
                  onChange={handleOnChange}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="e.g. Description"
                  value={inputs.description}
                  onChange={(e) => {
                    setInputs((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="price">Price</label>
                <Input
                  type="text"
                  name="price"
                  id="price"
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="e.g. 100"
                  value={inputs.price}
                  onChange={handleOnChange}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="category">Main Category</label>
                <select
                  name="category"
                  id="category"
                  className="border border-gray-300 rounded-md p-2"
                  value={inputs.category}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, category: e.target.value }))
                  }
                >
                  <option value="Women">Women</option>
                  <option value="Men">Men</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="subCategory">Sub Category</label>
                <select
                  name="subCategory"
                  id="subCategory"
                  className="border border-gray-300 rounded-md p-2"
                  value={inputs.subCategory}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      subCategory: e.target.value,
                    }))
                  }
                >
                  {filteredCategories?.map((category: Category) => (
                    <option key={category.categoryId} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="h-2" />
            <Button className="w-full h-12">List item</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
