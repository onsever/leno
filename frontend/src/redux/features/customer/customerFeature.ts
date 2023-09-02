import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Customer, CustomerInput } from "../../../types";
import { RootState } from "../../store.ts";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/customer`,
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
    getCustomerById: builder.query<Customer, number>({
      query: (id) => `/${id}`,
    }),
    deleteCustomerById: builder.mutation<string, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    updateCustomerById: builder.mutation<Customer, CustomerInput>({
      query: (customer) => ({
        url: `/${customer.customerId}`,
        method: "PUT",
        body: customer,
      }),
    }),
  }),
});

export const {
  useGetCustomerByIdQuery,
  useDeleteCustomerByIdMutation,
  useUpdateCustomerByIdMutation,
} = customerApi;
