import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store.ts";
import {
  Product,
  ProductDetail,
  ProductRequest,
  ProductRequestWithId,
} from "../../../types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/product`,
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
    createProductForCustomer: builder.mutation<Product, ProductRequest>({
      query: ({ customerId, productInput }) => ({
        url: `/customer/${customerId}`,
        method: "POST",
        body: productInput,
      }),
    }),
    getProductsByCustomerId: builder.query<ProductDetail[], number>({
      query: (customerId) => `/customer/${customerId}`,
    }),
    updateProductForCustomer: builder.mutation<Product, ProductRequestWithId>({
      query: ({ customerId, productId, productInput }) => ({
        url: `/customer/${customerId}`,
        method: "PUT",
        body: {
          productId,
          productInput,
        },
      }),
    }),
    getProductById: builder.query<ProductDetail, number>({
      query: (productId) => `/${productId}`,
    }),
    getAllProducts: builder.query<ProductDetail[], number>({
      query: () => `/`,
    }),
  }),
});

export const {
  useCreateProductForCustomerMutation,
  useGetProductsByCustomerIdQuery,
  useUpdateProductForCustomerMutation,
  useGetProductByIdQuery,
  useGetAllProductsQuery,
} = productApi;
