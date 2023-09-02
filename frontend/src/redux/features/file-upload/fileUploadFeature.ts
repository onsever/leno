import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store.ts";

export const fileUploadApi = createApi({
  reducerPath: "fileUploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/upload`,
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
    uploadProfilePicture: builder.mutation({
      query: ({ file, customerId }) => {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("customerId", customerId);

        console.log(formData.get("file"));
        console.log(formData.get("customerId"));

        return {
          url: "/customer/profile-picture",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadProfilePictureMutation } = fileUploadApi;
