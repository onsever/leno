import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store.ts";
import {
  Address,
  CreateAddressInput,
  DeleteAddressInput,
  UpdateAddressInput,
} from "../../../types";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/address`,
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
    getAllAddressesFromCustomer: builder.query<Address[], number>({
      query: (customerId) => `/${customerId}`,
    }),
    createAddressForCustomer: builder.mutation<Address, CreateAddressInput>({
      query: ({ customerId, address }) => ({
        url: `/${customerId}`,
        method: "POST",
        body: address,
      }),
    }),
    updateAddressForCustomer: builder.mutation<Address, UpdateAddressInput>({
      query: ({ customerId, address }) => ({
        url: `/${customerId}`,
        method: "PUT",
        body: address,
      }),
    }),
    deleteAddressForCustomer: builder.mutation<string, DeleteAddressInput>({
      query: ({ customerId, addressId }) => ({
        url: `/${customerId}/${addressId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllAddressesFromCustomerQuery,
  useCreateAddressForCustomerMutation,
  useUpdateAddressForCustomerMutation,
  useDeleteAddressForCustomerMutation,
} = addressApi;
