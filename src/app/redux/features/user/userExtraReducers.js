"use client";

import { registerUserThunk } from "./userThunks";

export const registerUserReducers = (builder) => {
  builder
    .addCase(registerUserThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(registerUserThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      console.log("Payload:", action.payload);
      state.loggedInUser = action.payload.user;
    })
    .addCase(registerUserThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
};
