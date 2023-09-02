import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authSlice.ts";
import { authApi } from "./features/auth/authFeature.ts";
import { customerApi } from "./features/customer/customerFeature.ts";
import { fileUploadApi } from "./features/file-upload/fileUploadFeature.ts";
import { addressApi } from "./features/address/addressFeature.ts";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [fileUploadApi.reducerPath]: fileUploadApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      customerApi.middleware,
      fileUploadApi.middleware,
      addressApi.middleware
    ),
});

setupListeners(store.dispatch);
