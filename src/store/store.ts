import { configureStore } from "@reduxjs/toolkit";
import heroReducer from "./hero-slice";
import appReducer from "./app-slice";

const store = configureStore({
  reducer: {
    app: appReducer,
    hero: heroReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
