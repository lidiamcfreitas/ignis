<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
</script>

<template>
<div class="min-h-[300px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 bg-pattern">
    <!-- Login Card -->
    <div class="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
    <!-- Not Logged In State -->
    <div v-if="!userStore.user" class="text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p class="text-gray-600 mb-8">Please sign in to continue</p>
        <button
            @click="userStore.login()"
            class="group flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-0.5"
        >
            <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                class="w-5 h-5 mr-3 transition-transform duration-300 group-hover:scale-110"
            />
            <span class="text-base">Continue with Google</span>
        </button>
    </div>

    <!-- Logged In State -->
    <div v-else class="text-center">
        <div class="mb-6 transform hover:scale-105 transition-transform duration-300">
            <img
                :src="userStore.user.photo_url"
                alt="Profile"
                class="w-24 h-24 mx-auto rounded-full border-4 border-blue-200 shadow-lg"
            />
        </div>
        <h2 class="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {{ userStore.user.display_name || "User" }}!
        </h2>
        <p class="text-gray-600 mb-8">{{ userStore.user.email }}</p>
        <button
            @click="userStore.logout()"
            class="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg transition-all duration-300 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
        >
            Sign Out
        </button>
    </div>
    </div>
</div>
</template>

<style scoped>
.bg-pattern {
background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
