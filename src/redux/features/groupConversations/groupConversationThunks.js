import { fetchGroupConversationById } from "@/api/conversations/getRequests";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGroupConversationByIdThunk = createAsyncThunk(
  "groupConversations/fetchGroupConversationById",
  async (_id, thunkAPI) => {
    try {
      const groupConversations = await fetchGroupConversationById(_id);
      return { groupConversations: groupConversations };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
