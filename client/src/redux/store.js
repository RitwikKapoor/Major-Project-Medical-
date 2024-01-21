import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootSlice.js";

const store = configureStore({
  reducer: {
    root: rootReducer,
  },
});

export default store;