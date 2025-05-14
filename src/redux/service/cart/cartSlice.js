import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_AUTH_ENDPOINT,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    tagTypes: ["Cart"],
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ userUuid, productUuid, quantity }) => ({
        url: "/api/v1/carts/add-to-cart",
        method: "POST",
        body: { userUuid, productUuid, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    getUserCart: builder.query({
      query: (userUuid) => `/api/v1/carts/get-by-user/${userUuid}`,
      providesTags: ["Cart"],
    }),

    removeQtyByOne: builder.mutation({
      query: (uuid) => ({
        url: `/api/v1/carts/remove-quantity/${uuid}`,
        method: "PUT",
      }),
    }),

    addQtyByOne: builder.mutation({
      query: (uuid) => ({
        url: `/api/v1/carts/add-quantity/${uuid}`,
        method: "PUT",
      }),
    }),

    removeCartItem: builder.mutation({
      query: ({ cartUuid, cartItemUuid }) => ({
        url: "/api/v1/carts/remove-cart-item",
        method: "PUT",
        body: (cartUuid, cartItemUuid),
      }),
      invalidatesTags: ["Cart"],
    }),

    removeAllItems: builder.mutation({
      query: (cartUuid) => ({
        url: `/api/v1/carts/${cartUuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetUserCartQuery,
  useAddToCartMutation,
  useRemoveQtyByOneMutation,
  useAddQtyByOneMutation,
  useRemoveCartItemMutation,
  useRemoveAllItemsMutation,
} = cartApi;
