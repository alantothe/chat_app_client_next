import { fetchAllConversationById } from "@/api/conversations/getRequests";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { seenBy } from "@/api/conversations/patchRequests";

export const fetchAllConversationByIdThunk = createAsyncThunk(
  "conversation/fetchAllConversationById",
  async (_id, thunkAPI) => {
    try {
      const conversation = await fetchAllConversationById(_id);
      return { conversation: conversation };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
