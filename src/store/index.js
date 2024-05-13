import { configureStore } from "@reduxjs/toolkit";
import imageReducer, { fetchImages } from "../api/apiSlice";
import imagesSearchedReducer from "../api/searchSlice";
import photographersReducer, {
  fetchAllPhotographers,
} from "../api/photographersSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    images: imageReducer,
    imagesSearched: imagesSearchedReducer,
    photographers: photographersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // برای حذف اخطارهای مربوط به serializability
    }).concat(logger), // logger از فیچر logging استفاده می‌کند
});

store.dispatch(fetchImages());
store.dispatch(fetchAllPhotographers());
