"use client";

import { registerUserThunk, loginUserThunk } from "./userThunks";

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

export const loginUserReducers = (builder) => {
  builder
    .addCase(loginUserThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(loginUserThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      console.log("Payload:", action.payload);
      state.loggedInUser = action.payload.user;
    })
    .addCase(loginUserThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
};
