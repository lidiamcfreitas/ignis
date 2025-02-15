import { defineStore } from "pinia";
import { User } from "@/models/user";
import { getFirebaseToken } from "@/firebase";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),
  actions: {
    async login() {
      try {
        const token = await getFirebaseToken();
        const response = await axios.post<User>("http://localhost:8000/auth/login", {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.user = response.data;
        this.token = token;
      } catch (error) {
        console.error("Login failed", error);
      }
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
});
