import { getMessages } from "@/api/messages/postRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMessagesThunk = createAsyncThunk(
  "activeConversation/getMessages",
  async (array, thunkAPI) => {
    try {
      const messages = await getMessages(array);
      return { messages: messages };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
