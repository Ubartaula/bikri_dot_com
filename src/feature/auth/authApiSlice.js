import { apiSlice } from "../../app/api/apiSlice";
import { clearToken, setToken } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendLogin: builder.mutation({
      query: (loginCredentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...loginCredentials },
      }),
    }),

    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearToken());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),

    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setToken({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // every things goes above here
  }),
});

export const {
  useSendLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = authApiSlice;
