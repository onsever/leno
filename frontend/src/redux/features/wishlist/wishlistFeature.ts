import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store.ts";
import { Product } from "../../../types";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  tagTypes: ["Wishlist"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/wishlist`,
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
    getWishlistByCustomerId: builder.query<Product[], number>({
      query: (customerId) => `/${customerId}`,
      providesTags: (result) => {
        if (!result) return [{ type: "Wishlist" }];
        return result.map(({ productId }) => ({ type: "Wishlist", productId }));
      },
    }),
    addProductToWishlistByCustomerId: builder.mutation<
      string,
      { customerId: number; productId: number }
    >({
      query: ({ customerId, productId }) => ({
        url: `/${customerId}/add/${productId}`,
        method: "POST",
        invalidatesTags: [{ type: "Wishlist", productId }],
      }),
    }),
    removeProductFromWishlistByCustomerId: builder.mutation<
      string,
      { customerId: number; productId: number }
    >({
      query: ({ customerId, productId }) => ({
        url: `/${customerId}/remove/${productId}`,
        method: "DELETE",
        invalidatesTags: [{ type: "Wishlist", productId }],
      }),
    }),
  }),
});

export const {
  useGetWishlistByCustomerIdQuery,
  useAddProductToWishlistByCustomerIdMutation,
  useRemoveProductFromWishlistByCustomerIdMutation,
} = wishlistApi;
