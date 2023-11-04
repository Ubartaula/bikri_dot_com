import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setToken: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },

    clearToken: (state, action) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export const currentToken = (state) => state.auth.token;
export default authSlice.reducer;
