import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_AUTH_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getAllBrand: builder.query({
      query: () => ({
        url: "/api/v1/brands",
        method: "GET",
      }),
    }),
    getBrandByUuid: builder.query({
      query: (uuid) => ({
        url: `/api/v1/brands/${uuid}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBrandQuery, useGetBrandByUuidQuery } = brandApi;
