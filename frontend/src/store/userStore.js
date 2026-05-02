import { create } from "zustand";
import axios from "axios";

const API_URL_USERS = "http://localhost:5000/api/users";
axios.defaults.withCredentials = true;

export const useUserStore = create((set) => ({
  users: [],
  counters: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL_USERS}/get-users`);
      const fetchedUsers = response.data.users || [];
      set({ users: fetchedUsers, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Erreur lors du chargement",
        loading: false,
      });
    }
  },

  createUser: async (name, email, role) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL_USERS}/create-user`, {
        name,
        email,
        role,
      });
      set((state) => ({
        users: [...state.users, response.data],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Erreur lors de la création",
        loading: false,
      });
    }
  },

  deleteUser: async (id) => {
    try {
      await axios.delete(`${API_URL_USERS}/${id}`);
      set((state) => ({
        users: state.users.filter((u) => u._id !== id),
      }));
    } catch (error) {
      console.error("Delete error:", error);
    }
  },

  updateUser: async (userData) => {
    if (!userData || !userData._id) {
      console.error("Update failed: User object or _id is missing", userData);
      set({ error: "ID de l'utilisateur manquant" });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.put(`${API_URL_USERS}/${userData._id}`, {
        name: userData.name,
        email: userData.email,
        role: userData.role,
      });

      const updatedUser = response.data;
      set((state) => ({
        users: state.users.map((u) =>
          u._id === userData._id ? updatedUser : u,
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Erreur lors de la mise à jour",
        loading: false,
      });
    }
  },
  fetchCounters: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL_USERS}/get-counters`);
      set({ counters: response.data, loading: false });
      console.log("Fetched counters:", response.data);
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Erreur lors du chargement",
        loading: false,
      });
      throw error;
    }
  },
}));
