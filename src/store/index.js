import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../services/api/apiSlice';
import themeReducer from "../services/slices/themeSlice";
import authReducer from "../services/slices/authSlice";
import cartReducer from "../services/slices/cartSlice";

export const store = configureStore({
  reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        theme: themeReducer,
    auth: authReducer,
    cart: cartReducer,
        
    // Add other reducers here if you have any
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
