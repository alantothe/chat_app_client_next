"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "@/api/user/postRequest";
import { getUserById } from "@/api/user/getRequest.js";
import jwtDecode from "jwt-decode";

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

export const getUserByIdThunk = createAsyncThunk(
  "user/getUserByIdThunk",
  async (_id, thunkAPI) => {
    try {
      const user = await getUserById(_id);
      return { user: user };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
