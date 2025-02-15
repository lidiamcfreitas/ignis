<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { ref } from 'vue';

const userStore = useUserStore();
const hover = ref(false);
</script>

<template>
<v-container fluid class="fill-height bg-grey-lighten-4">
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
            <v-card
                class="mx-auto pa-6"
                elevation="6"
                rounded="lg"
                :class="{'elevation-12': hover}"
                @mouseenter="hover = true"
                @mouseleave="hover = false"
            >
                <v-card-item v-if="!userStore.user" class="text-center">
                    <v-card-title class="text-h4 font-weight-bold mb-2">Welcome Back</v-card-title>
                    <v-card-subtitle class="text-body-1 mb-6">Please sign in to continue</v-card-subtitle>
                    <v-btn
                        block
                        color="surface"
                        elevation="1"
                        @click="userStore.login()"
                        class="mt-4"
                        prepend-icon="mdi-google"
                    >
                        Continue with Google
                    </v-btn>
                </v-card-item>

                <v-card-item v-else class="text-center">
                    <v-hover>
                        <template v-slot:default="{ isHovering }">
                            <v-avatar
                                size="96"
                                class="mb-4"
                                :elevation="isHovering ? 8 : 2"
                                :class="{'transform-scale-110': isHovering}"
                            >
                                <v-img :src="userStore.user.photo_url" alt="Profile" cover />
                            </v-avatar>
                        </template>
                    </v-hover>
                    
                    <v-card-title class="text-h4 font-weight-bold mb-2">
                        Welcome back, {{ userStore.user.display_name || "User" }}!
                    </v-card-title>
                    <v-card-subtitle class="text-body-1 mb-6">{{ userStore.user.email }}</v-card-subtitle>
                    
                    <v-btn
                        color="error"
                        @click="userStore.logout()"
                        elevation="2"
                        class="mt-4"
                        prepend-icon="mdi-logout"
                    >
                        Sign Out
                    </v-btn>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<style>
.transform-scale-110 {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
}
</style>
