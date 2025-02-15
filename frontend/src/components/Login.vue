<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
</script>

<template>
  <div>
    <button @click="userStore.login()">Login</button>
    <button @click="userStore.logout()">Logout</button>

    <div v-if="userStore.user">
      <p>Welcome, {{ userStore.user.display_name || "User" }}!</p>
      <p>Email: {{ userStore.user.email }}</p>
    </div>
  </div>
</template>
