import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../models/types";

const initialState: AppState = {
  isHeroExist: false,
  isMenuOpen: true,
  notification: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setHeroExist(state) {
      state.isHeroExist = true;
    },
    setHeroDontExist(state) {
      state.isHeroExist = false;
    },
    toggleMenu(state, action) {
      state.isMenuOpen = action.payload.open;
    },
    showModal(state, action) {
      state.notification = action.payload.note;
    },
    closeModal(state) {
      state.notification = null;
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
