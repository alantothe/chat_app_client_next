"use client";

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import conversationReducer from "./features/conversations/conversationSlice";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  conversation: conversationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
