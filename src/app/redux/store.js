"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/user/userSlice.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
