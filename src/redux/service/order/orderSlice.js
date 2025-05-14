import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_AUTH_ENDPOINT,
  }),
  endpoints: (builder) => ({
    makeOrder: builder.mutation({
      query: ({ userUuid, cartUuid }) => ({
        url: `/api/v1/orders/place-order/${userUuid}/${cartUuid}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getAllOrder: builder.query({
      query: (userUuid) => ({
        url: `/api/v1/orders/get-by-user/${userUuid}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getOrderByUuid: builder.query({
      query: ({ orderUuid, userUuid }) => ({
        url: `/api/v1/orders/${orderUuid}/${userUuid}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    cancelOrder: builder.mutation({
      query: (orderUuid) => ({
        url: `/api/v1/orders/cancel-order/${orderUuid}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const {
  useMakeOrderMutation,
  useGetAllOrderQuery,
  useGetOrderByUuidQuery,
  useCancelOrderMutation,
} = orderApi;
