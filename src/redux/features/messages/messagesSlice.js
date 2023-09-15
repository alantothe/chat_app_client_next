"use client";

import { createSlice } from "@reduxjs/toolkit";
import { fetchAllConversationByIdReducer } from "./conversationExtraReducers";

const initialState = {
  conversations: undefined,
  loading: false,
  error: null,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    resetConvos: () => initialState,
  },
  extraReducers: (builder) => {
    fetchAllConversationByIdReducer(builder);
  },
});

export const { resetConvos } = conversationSlice.actions;
export default conversationSlice.reducer;
