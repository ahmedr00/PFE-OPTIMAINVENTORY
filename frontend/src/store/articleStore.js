import { create } from "zustand";
import axios from "axios";
const API_URL_ARTICLES = "http://localhost:5000/api/articles";
axios.defaults.withCredentials = true;
export const useArticleStore = create((set) => ({
  articles: [],
  error: null,
  isLoading: false,
  fetchArticles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL_ARTICLES}/get-articles`);
      const articlesArray = response.data.articles || [];
      console.log(articlesArray);
      set({ articles: articlesArray, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
