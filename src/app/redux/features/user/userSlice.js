"use client";

import { createSlice } from "@reduxjs/toolkit";
import { registerUserReducers } from "./userExtraReducers";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: {}, // or loggedInUser: {}
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    registerUserReducers(builder);
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
