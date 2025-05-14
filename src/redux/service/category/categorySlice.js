import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_AUTH_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/api/v1/categories",
        method: "GET",
      }),
    }),
    getCategoryByUuid: builder.query({
      query: (uuid) => ({
        url: `/api/v1/categories/${uuid}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetCategoryByUuidQuery } = categoriesApi;
