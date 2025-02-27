import { defineStore } from "pinia";
import { User } from "@/models/user";
import { auth } from "@/firebase";
import { PersistenceOptions } from "pinia-plugin-persistedstate";
import {
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential
} from "firebase/auth";
import api from "@/api/api"

// Set up auth persistence and dev settings
auth.settings.appVerificationDisabledForTesting = import.meta.env.DEV;
setPersistence(auth, browserLocalPersistence);
interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  userCredential: UserCredential | null;
  token: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    isAuthenticated: false,
    user: null,
    userCredential: null,
    token: null,
  }),
  actions: {
    async getFirebaseUserCredential() {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider);
    },
    scheduleTokenRefresh() {
      if (!this.userCredential || !this.userCredential.user) return;

      this.userCredential.user.getIdTokenResult().then((idTokenResult) => {
        const expiresIn = idTokenResult.expirationTime ? 
          new Date(idTokenResult.expirationTime).getTime() - Date.now() : 
          60 * 60 * 1000; // Default to 1 hour

        setTimeout(async () => {
          await this.fetchToken(true);
          this.scheduleTokenRefresh(); // Schedule next refresh
        }, expiresIn - 60000); // Refresh 1 min before expiration
      });
    },
    initializeAuthStateObserver() {
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          if (!this.isAuthenticated) {
            this.token = await firebaseUser.getIdToken();
            if (this.token) {
              await this.restoreSession(this.token);
              this.scheduleTokenRefresh(); // Start auto-refresh
            } else {
              throw new Error("Token is null");
            }
          }
        } else {
          this.logout();
        }
      });
    },
    async fetchToken(forceRefresh = false) {
      if (this.userCredential) {
        try {
          this.token = await this.userCredential.user.getIdToken(forceRefresh);
        } catch (error) {
          console.error('Failed to refresh token:', error);
          this.token = null;
        }
      }
    },
    async login() {
      try {
        const userCredential = await this.getFirebaseUserCredential();
        this.userCredential = userCredential;
        await this.fetchToken();
        // const token = await userCredential.user.getIdToken();
        if (this.token) {
          await this.restoreSession(this.token);
        } else {
          throw new Error("Token is null");
        }
      } catch (error) {
        console.error("Login failed", error);
        this.isAuthenticated = false;
        this.user = null;
        this.token = null;
        throw error;
      }
    },
    async restoreSession(token: string) {
      try {
        const response = await api.post<User>("/auth/login", {}, {})
        this.user = response.data;
        this.token = token;
        this.isAuthenticated = true;
      } catch (error) {
        console.error("Session restore failed", error);
        this.logout();
        throw new Error('Login failed');
      }
    },
    async logout() {
      try {
        await signOut(auth);
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
      } catch (error) {
        console.error("Logout failed", error);
        throw error;
      }
    },
    async updateProfile(profileData: Partial<User>) {
      try {
        const response = await api.patch<User>(
          "/auth/profile",
          profileData, {}
        );
        this.user = response.data;
        return response.data;
      } catch (error) {
        console.error("Profile update failed", error);
        throw error;
      }
    }
  },
  persist: {
    key: 'user-store',
    storage: localStorage,
    paths: ['isAuthenticated', 'user', 'token']
  } as PersistenceOptions<UserState>
});