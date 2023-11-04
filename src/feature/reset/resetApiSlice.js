import { apiSlice } from "../../app/api/apiSlice";

export const resetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    otpVerify: builder.mutation({
      query: (info) => ({
        url: "/reset",
        method: "PUT",
        body: { ...info },
      }),
    }),

    restPassword: builder.mutation({
      query: (patchInfo) => ({
        url: "/reset",
        method: "PATCH",
        body: { ...patchInfo },
      }),
    }),

    // every things goes above here
  }),
});

export const { useOtpVerifyMutation, useRestPasswordMutation } = resetApiSlice;
