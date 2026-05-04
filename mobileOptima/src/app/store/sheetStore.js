import { create } from "zustand";
import axios from "axios";
const API_URL_SHEET = "http://localhost:3000/api/sheets";
axios.defaults.withCredentials = true;
export const useSheetStore = create((set) => ({
  sheets: [],
  error: null,
  isLoading: false,
  fetchSheets: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL_SHEET}/get-sheet-mobile`);
      const sheetsArray = response.data.sheets || [];
      console.log("wawa", sheetsArray);
      //   await AsyncStorage.setItem("sheetsArray", sheetsArray);
      //   console.log("zy", AsyncStorage.getItem("sheetArray"));

      set({ sheets: sheetsArray, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
