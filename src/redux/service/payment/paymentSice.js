import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_AUTH_ENDPOINT,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    bakongQr: builder.mutation({
      query: ({ userUuid, orderUuid, currency, city }) => ({
        url: "/api/v1/bakong-payment/generate-individual-qr",
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
        body: JSON.stringify({ userUuid, orderUuid, currency, city }), // Ensure valid JSON body
      }),
    }),

    makeQr: builder.mutation({
      query: (qr) => ({
        url: "/api/v1/bakong-payment/generate-qr",
        method: "POST",
        body: qr,
      }),
    }),

    // In your RTK Query file, update the verifyMd5 mutation:
    verifyMd5: builder.mutation({
      query: (md5) => ({
        url: "https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5",
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_BAKONG_TOKEN}`, // Use Bakong token directly
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ md5 }),
      }),
    }),

    makePayment: builder.mutation({
      query: ({ userUuid, orderUuid }) => ({
        url: `/api/v1/payments/${userUuid}/${orderUuid}`,
        method: "POST",
      }),
    }),

    getAllPayment: builder.query({
      query: () => ({
        url: "/api/v1/payments",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useBakongQrMutation,
  useMakePaymentMutation,
  useMakeQrMutation,
  useVerifyMd5Mutation,
  useGetAllPaymentQuery,
} = paymentApi;
