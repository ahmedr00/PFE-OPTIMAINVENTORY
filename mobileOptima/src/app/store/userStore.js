import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:3000/api/auth";

export const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login-mobile`, {
        email,
        password,
      });

      // AsyncStorage only accepts strings
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      await AsyncStorage.setItem("isAuthenticated", "true");

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error in logging in",
        isLoading: false,
      });
      throw error;
    }
  },
  checkAuth: async () => {
    try {
      const userJSON = await AsyncStorage.getItem("user");
      const user = userJSON ? JSON.parse(userJSON) : null;
      set({ user });
    } catch (error) {
      console.log("Auth check failed", error);
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/logout-mobile`);
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("isAuthenticated");
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout error", error);
    }
  },
}));
