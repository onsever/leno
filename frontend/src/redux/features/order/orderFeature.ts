import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store.ts";
import { Order, OrderRequest } from "../../../types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/order`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      headers.set("Access-Control-Allow-Origin", "*");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllOrdersByCustomerId: builder.query<Order[], number>({
      query: (customerId: number) => `/${customerId}`,
    }),
    createOrder: builder.mutation<any, OrderRequest>({
      query: (orderRequest: OrderRequest) => ({
        url: ``,
        method: "POST",
        body: orderRequest,
      }),
    }),
  }),
});

export const { useGetAllOrdersByCustomerIdQuery, useCreateOrderMutation } =
  orderApi;
