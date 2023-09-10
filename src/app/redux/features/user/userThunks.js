"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "@/api/user/postRequest";
import jwtDecode from "jwt-decode";

const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(atob(base64));
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

export const registerUserThunk = createAsyncThunk(
  "user/registerUserThunk",
  async (formData, thunkAPI) => {
    try {
      const response = await registerUser(formData);
      const token = response.data.token;
      localStorage.setItem("token", response.data.token);
      const user = jwtDecode(token);
      return { user: user, token: token };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "user/loginUserThunk",
  async (formData, thunkAPI) => {
    try {
      const response = await loginUser(formData);
      const token = response.data.token;
      localStorage.setItem("token", response.data.token);
      const user = jwtDecode(token);

      return { user: user, token: token };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
