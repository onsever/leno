import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartItem } from "../../../types";
import { RootState } from "../../store.ts";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/cart`,
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
    getCartItems: builder.query<CartItem[], number>({
      query: (customerId) => `/customer/${customerId}`,
    }),
    addToCart: builder.mutation<
      string,
      {
        customerId: number;
        productId: number;
      }
    >({
      query: ({ customerId, productId }) => ({
        url: `/product/${productId}/customer/${customerId}`,
        method: "POST",
      }),
    }),
    deleteCartItem: builder.mutation<string, number>({
      query: (cartItemId) => ({
        url: `/${cartItemId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useAddToCartMutation,
  useDeleteCartItemMutation,
} = cartApi;
