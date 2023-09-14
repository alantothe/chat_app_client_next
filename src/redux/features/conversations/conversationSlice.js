"use client";

import { createSlice } from "@reduxjs/toolkit";
// import {
//   registerUserReducers,
//   loginUserReducers,
//   getUserByIdExtraReducers,
// } from "./userExtraReducers";

const initialState = {
  conversations: undefined,
  loading: false,
  error: null,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {},
});

export const { reset } = conversationSlice.actions;
export default conversationSlice.reducer;
