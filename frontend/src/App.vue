<script setup lang="ts">
import Login from "@/components/Login.vue";
import { ref } from 'vue'

const drawer = ref(false)
const theme = ref('light')

const toggleTheme = () => {
theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
<v-app :theme="theme">
    <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-title>Ignis</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="toggleTheme">
        <v-icon>{{ theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
    </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
        <v-list-item title="Home" prepend-icon="mdi-home"></v-list-item>
        <v-list-item title="Profile" prepend-icon="mdi-account"></v-list-item>
        <v-list-item title="Settings" prepend-icon="mdi-cog"></v-list-item>
    </v-list>
    </v-navigation-drawer>

    <v-main>
        <v-container fluid class="fill-height pa-0 bg-transparent">
            <Login/>
        </v-container>
    </v-main>
</v-app>
</template>
