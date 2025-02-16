import { defineStore } from "pinia";
import { User } from "@/models/user";
import { getFirebaseToken } from "@/firebase";
import axios from "axios";

interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    isAuthenticated: false,
    user: null,
    token: null,
  }),
  actions: {
    async login() {
      try {
        const token = await getFirebaseToken();
        await this.restoreSession(token);
      } catch (error) {
        console.error("Login failed", error);
        this.isAuthenticated = false;
      }
    },
    async restoreSession(token: string) {
      try {
        const response = await axios.post<User>("http://localhost:8000/auth/login", {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.user = response.data;
        this.token = token;
        this.isAuthenticated = true;
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', token);
      } catch (error) {
        console.error("Session restore failed", error);
        this.logout();
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    initializeFromStorage() {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        this.user = JSON.parse(storedUser);
        this.token = storedToken;
        this.isAuthenticated = true;
      }
    }
  },
});