import { create } from "zustand";
import axios from "axios";
const API_URL_SHEET = "http://localhost:3000/api/sheets";
axios.defaults.withCredentials = true;
export const useSheetStore = create((set) => ({
  sheets: [],
  currentSheet: null,
  error: null,
  isLoading: false,
  updateArticleCount: async (sheetId, articleId, quantity) => {
    console.log(sheetId, articleId, quantity);
    try {
      const response = await axios.put(
        `${API_URL_SHEET}/${sheetId}/articles/${articleId}/count`,
        { counted: quantity },
      );

      // Sync the new data into the store immediately
      set((state) => ({
        currentSheet: response.data.sheet,
        sheets: state.sheets.map((s) =>
          s._id === sheetId ? response.data.sheet : s,
        ),
      }));
      return true;
    } catch (error) {
      console.error("Store Update Error:", error.message);
      return false;
    }
  },
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
  getSingleSheet: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL_SHEET}/${id}`);
      set({ currentSheet: response.data.sheet, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
