import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:3000/api/auth";

export const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  hasCheckedAuth: false,
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
    set({ isLoading: true, error: null });
    try {
      const userJSON = await AsyncStorage.getItem("user");
      const isAuthenticated = await AsyncStorage.getItem("isAuthenticated");
      const user = userJSON ? JSON.parse(userJSON) : null;
      set({
        user,
        isAuthenticated: !!user && isAuthenticated === "true",
        hasCheckedAuth: true,
        isLoading: false,
      });
    } catch (error) {
      console.log("Auth check failed", error);
      set({
        user: null,
        isAuthenticated: false,
        hasCheckedAuth: true,
        isLoading: false,
      });
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/logout-mobile`);
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("isAuthenticated");
      set({ user: null, isAuthenticated: false, hasCheckedAuth: true });
    } catch (error) {
      console.error("Logout error", error);
    }
  },
  updateUser: async (name) => {
    try {
      const res = await axios.patch(
        `${API_URL}/update-me`,
        { name },
        { withCredentials: true },
      );
      set({ user: res.data.user }); // Local update
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response.data.message };
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    try {
      await axios.patch(
        `${API_URL}/update-password`,
        {
          currentPassword,
          newPassword,
        },
        { withCredentials: true },
      );
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response.data.message };
    }
  },
}));
