import { configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";

import journalReducer from "../features/journal/journalSlice";

import dashboardReducer from "../features/dashboard/dashboardSlice";

import profileReducer from "../features/profile/profileSlice";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};


const rootReducer = combineReducers({
  auth: authReducer,
  journal: journalReducer,
  dashboard: dashboardReducer,
  profile: profileReducer,
});


const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);


export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const persistor = persistStore(store);