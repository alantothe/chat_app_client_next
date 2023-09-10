"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "@/api/user/postRequest";

export const registerUserThunk = createAsyncThunk(
  "user/registerUserThunk",
  async (formData, thunkAPI) => {
    try {
      const userData = await registerUser(formData);
      return userData.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "user/loginUserThunk",
  async (formData, thunkAPI) => {
    try {
      const userData = await loginUser(formData);
      return userData.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
