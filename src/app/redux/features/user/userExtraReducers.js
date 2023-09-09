"use client";

import { registerUserThunk } from "./userThunks";

export const registerUserReducers = (builder) => {
  builder
    .addCase(registerUserThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(registerUserThunk.fulfilled, (state) => {
      state.status = "succeeded";
      state.user = action.payload.user;
    })
    .addCase(registerUserThunk.rejected, (state) => {
      state.status = "failed";
      state.error = action.payload;
    });
};
