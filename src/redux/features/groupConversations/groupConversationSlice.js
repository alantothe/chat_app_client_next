"use client";

import { createSlice } from "@reduxjs/toolkit";
import { fetchGroupConversationByIdReducer } from "./groupConcersationExtraReducers";

const initialState = {
  groupConversations: undefined,
  loading: false,
  error: null,
};

export const groupConversationSlice = createSlice({
  name: "groupConversations",
  initialState,
  reducers: {
    resetGroupConvos: () => initialState,
  },
  extraReducers: (builder) => {
    fetchGroupConversationByIdReducer(builder);
  },
});

export const { resetGroupConvos } = groupConversationSlice.actions;
export default groupConversationSlice.reducer;
