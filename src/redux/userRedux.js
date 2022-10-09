import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    errors: false,
    errorLog: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.errorLog = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.errors = false;
      state.errorLog = null;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.errors = true;
      state.errorLog = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
  loginFailureTimeout,
} = userSlice.actions;
export default userSlice.reducer;
