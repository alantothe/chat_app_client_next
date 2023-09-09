"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "@/api/user/postRequest";

export const registerUserThunk = createAsyncThunk(
  "user/registerUserThunk",
  async (formData, thunkAPI) => {
    try {
      const userData = await registerUser(formData);
      return userData.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
