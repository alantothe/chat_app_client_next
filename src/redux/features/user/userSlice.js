"use client";

import { createSlice } from "@reduxjs/toolkit";
import {
  registerUserReducers,
  loginUserReducers,
  getUserByIdExtraReducers,
} from "./userExtraReducers";

const initialState = {
  loggedInUser: undefined,
  entireUser: undefined,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    registerUserReducers(builder);
    loginUserReducers(builder);
    getUserByIdExtraReducers(builder);
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
