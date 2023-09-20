"use client";

import { fetchGroupConversationByIdThunk } from "./groupConversationThunks";

export const fetchGroupConversationByIdReducer = (builder) => {
  builder
    .addCase(fetchGroupConversationByIdThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(fetchGroupConversationByIdThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      // console.log("payload:", action.payload);
      state.groupConversations = action.payload.groupConversations.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    })
    .addCase(fetchGroupConversationByIdThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
};
