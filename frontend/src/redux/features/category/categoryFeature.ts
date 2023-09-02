import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store.ts";
import { Category } from "../../../types";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/category`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Access-Control-Allow-Origin", "*");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], string>({
      query: () => `/all`,
    }),
    getCategoryByName: builder.query<Category, string>({
      query: (categoryName) => `/${categoryName}`,
    }),
    assignCategoryToProduct: builder.mutation<
      Category,
      { categoryId: number; productId: number }
    >({
      query: ({ categoryId, productId }) => ({
        url: `/${categoryId}/product/${productId}`,
        method: "POST",
        body: {
          categoryId,
          productId,
        },
      }),
    }),
    deleteCategoryFromProduct: builder.mutation<
      void,
      { categoryId: number; productId: number }
    >({
      query: ({ categoryId, productId }) => ({
        url: `/${categoryId}/product/${productId}`,
        method: "DELETE",
        body: {
          categoryId,
          productId,
        },
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByNameQuery,
  useAssignCategoryToProductMutation,
  useDeleteCategoryFromProductMutation,
} = categoryApi;
