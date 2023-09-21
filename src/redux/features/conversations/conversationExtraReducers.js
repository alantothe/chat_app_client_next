"use client";

import { fetchAllConversationByIdThunk } from "./conversationThunks";

export const fetchAllConversationByIdReducer = (builder) => {
  builder
    // .addCase(fetchAllConversationByIdThunk.pending, (state) => {
    //   state.status = "loading";
    //   state.error = null;
    // })
    .addCase(fetchAllConversationByIdThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      // console.log("payload:", action.payload);
      state.conversation = action.payload.conversation.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    })
    .addCase(fetchAllConversationByIdThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
};
