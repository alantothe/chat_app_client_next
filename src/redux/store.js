"use client";

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import conversationReducer from "./features/conversations/conversationSlice";
import activeConversationReducer from "./features/messages/messagesSlice";
import groupConversationReducer from "./features/groupConversations/groupConversationSlice";

import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["activeConversation"], // activeConversation state isn't persisted.
};

const rootReducer = combineReducers({
  user: userReducer,
  conversation: conversationReducer,
  activeConversation: activeConversationReducer,
  groupConversation: groupConversationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
