<script setup lang="ts">
import Login from "@/components/Login.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import { ref } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useUserStore } from '@/stores/userStore'

const settingsStore = useSettingsStore()
const userStore = useUserStore()
const drawer = ref(false)
</script>

<template>
    <v-app :theme="settingsStore.theme">
    <v-app-bar>
        <v-app-bar-nav-icon v-if="userStore.user" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>Ignis</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="settingsStore.toggleTheme">
        <v-icon>{{ settingsStore.theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
        </v-btn>
        </v-app-bar>

        <NavigationDrawer v-model="drawer" v-if="userStore.user"/>

        <v-main>
            <v-container fluid class="fill-height">
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>
