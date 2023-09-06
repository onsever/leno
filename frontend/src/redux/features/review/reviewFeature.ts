import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store.ts";
import { ReviewResponse, ReviewRequest } from "../../../types";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/review`,
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
    getAllReviewsForProduct: builder.query<ReviewResponse[], number>({
      query: (productId: number) => `/${productId}`,
    }),
    createReviewForProduct: builder.mutation<ReviewResponse, ReviewRequest>({
      query: (reviewRequest: ReviewRequest) => ({
        url: `/create`,
        method: "POST",
        body: reviewRequest,
      }),
    }),
    deleteReviewForProduct: builder.mutation<
      string,
      { reviewId: number; productId: number }
    >({
      query: ({ reviewId, productId }) => ({
        url: `/delete/${reviewId}/${productId}`,
        method: "DELETE",
      }),
    }),
    updateReviewForProduct: builder.mutation<ReviewResponse, ReviewRequest>({
      query: (reviewRequest: ReviewRequest) => ({
        url: `/update`,
        method: "PUT",
        body: reviewRequest,
      }),
    }),
  }),
});

export const {
  useGetAllReviewsForProductQuery,
  useCreateReviewForProductMutation,
  useDeleteReviewForProductMutation,
  useUpdateReviewForProductMutation,
} = reviewApi;
