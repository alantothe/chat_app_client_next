"use client";

import { createSlice } from "@reduxjs/toolkit";
import { registerUserReducers, loginUserReducers } from "./userExtraReducers";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: undefined,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    registerUserReducers(builder);
    loginUserReducers(builder);
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
