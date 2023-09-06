import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authSlice.ts";
import { authApi } from "./features/auth/authFeature.ts";
import { customerApi } from "./features/customer/customerFeature.ts";
import { fileUploadApi } from "./features/file-upload/fileUploadFeature.ts";
import { addressApi } from "./features/address/addressFeature.ts";
import { productApi } from "./features/product/productFeature.ts";
import { categoryApi } from "./features/category/categoryFeature.ts";
import { wishlistApi } from "./features/wishlist/wishlistFeature.ts";
import { cartApi } from "./features/cart/cartFeature.ts";
import { shipperApi } from "./features/shipper/shipperFeature.ts";
import { orderApi } from "./features/order/orderFeature.ts";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [fileUploadApi.reducerPath]: fileUploadApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [shipperApi.reducerPath]: shipperApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
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
      addressApi.middleware,
      productApi.middleware,
      categoryApi.middleware,
      wishlistApi.middleware,
      cartApi.middleware,
      shipperApi.middleware,
      orderApi.middleware
    ),
});

setupListeners(store.dispatch);
