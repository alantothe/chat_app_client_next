"use client";

import { createSlice } from "@reduxjs/toolkit";
import { getMessagesReducer } from "./messageExtraReducers";

const initialState = {
  members: undefined,
  allMessages: undefined,
  isOpen: false,
  loading: false,
  error: null,
};

export const activeConversationSlice = createSlice({
  name: "activeConversation",
  initialState,
  reducers: {
    resetActiveConversation: () => initialState,
  },
  extraReducers: (builder) => {
    getMessagesReducer(builder);
  },
});

export const { resetActiveConversation } = activeConversationSlice.actions;
export default activeConversationSlice.reducer;
