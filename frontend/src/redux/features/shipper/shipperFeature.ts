import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Shipper } from "../../../types";

export const shipperApi = createApi({
  reducerPath: "shipperApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/shipper`,
  }),
  endpoints: (builder) => ({
    getAllShippers: builder.query<Shipper[], void>({
      query: () => `/all`,
    }),
  }),
});

export const { useGetAllShippersQuery } = shipperApi;
