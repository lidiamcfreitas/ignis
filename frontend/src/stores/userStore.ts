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
    const response = await axios.post<User>("http://localhost:8000/auth/login", {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    this.user = response.data;
    this.token = token;
    this.isAuthenticated = true;
    } catch (error) {
    console.error("Login failed", error);
    this.isAuthenticated = false;
    }
},
logout() {
    this.user = null;
    this.token = null;
    this.isAuthenticated = false;
},
},
});
