import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
  const storeDarkMode = localStorage.getItem("darkmode");
  return storeDarkMode ? JSON.parse(storeDarkMode) : true;
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
    darkMode: getInitialDarkMode(),
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    setDarkMode: (state) => {
      localStorage.setItem("darkmode", JSON.stringify(!state.darkMode));
      state.darkMode = !state.darkMode;
    },
  },
});

export const { startLoading, stopLoading, setDarkMode } = uiSlice.actions;
