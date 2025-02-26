import { defineStore } from "pinia";
import { User } from "@/models/user";
import { getFirebaseToken } from "@/firebase";
import axios from "axios";
import { PersistenceOptions } from "pinia-plugin-persistedstate";

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
        this.user = null;
        this.token = null;
        throw error; // Re-throw the original error
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
      } catch (error) {
        console.error("Session restore failed", error);
        this.logout();
        throw new Error('Login failed');
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },
    async updateProfile(profileData: Partial<User>) {
      try {
        const response = await axios.patch<User>(
          "http://localhost:8000/auth/profile",
          profileData,
          {
            headers: { Authorization: `Bearer ${this.token}` }
          }
        );

        this.user = response.data;
        return response.data;
      } catch (error) {
        console.error("Profile update failed", error);
        throw error;
      }
    }
  },
  // Add this persist configuration
  persist: {
    key: 'user-store',
    storage: localStorage,
    paths: ['isAuthenticated', 'user', 'token']
  } as PersistenceOptions<UserState>
});