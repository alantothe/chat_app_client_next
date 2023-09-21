"use client";

import { getMessagesThunk } from "./messageThunks";

export const getMessagesReducer = (builder) => {
  builder
    // .addCase(getMessagesThunk.pending, (state) => {
    //   state.status = "loading";
    //   state.error = null;
    // })
    .addCase(getMessagesThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      // console.log("payload:", action.payload);
      state.allMessages = action.payload;
    })
    .addCase(getMessagesThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
};
