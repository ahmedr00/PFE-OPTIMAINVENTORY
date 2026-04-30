import { create } from "zustand";
import axios from "axios";
const API_URL_SHEET = "http://localhost:5000/api/sheets";
axios.defaults.withCredentials = true;
export const useSheetStore = create((set) => ({
  sheets: [],
  error: null,
  isLoading: false,
  fetchSheets: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL_SHEET}/get-sheet`);
      // Extract the sheets array from the response object
      const sheetsArray = response.data.sheets || [];
      console.log(sheetsArray);
      set({ sheets: sheetsArray, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  createSheet: async (name, totalArticles, progress) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL_SHEET}/create-sheet`, {
        name,
        totalArticles,
        progress,
      });
      set((state) => ({
        sheets: [...state.sheets, response.data.sheet],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  deleteSheet: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL_SHEET}/${id}`);
      set((state) => ({
        sheets: state.sheets.filter((sheet) => sheet._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
