import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_AUTH_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: ({ page = 0, size = 12 }) => ({
        url: "/api/v1/products",
        method: "GET",
        params: { page, size },
      }),
    }),
    getByUuid: builder.query({
      query: (uuid) => ({
        url: `/api/v1/products/${uuid}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetAllQuery, useGetByUuidQuery } = productApi;
