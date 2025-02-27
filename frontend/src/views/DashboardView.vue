<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const quickLinks = [
    {
        title: 'GitHub',
        icon: 'mdi-github',
        url: 'https://github.com/lidiamcfreitas/ignis',
        color: 'grey-darken-3'
    },
    {
        title: 'Frontend',
        icon: 'mdi-web',
        url: 'http://localhost:8080/',
        color: 'blue-darken-3'
    },
    {
        title: 'Backend',
        icon: 'mdi-database',
        url: 'http://localhost:8000/',
        color: 'blue-lighten-1'
    },
    {
        title: 'Gmail',
        icon: 'mdi-gmail',
        url: 'https://gmail.com',
        color: 'red'
    },
    {
        title: 'Calendar',
        icon: 'mdi-calendar',
        url: 'https://calendar.google.com',
        color: 'blue'
    },
    {
        title: 'Drive',
        icon: 'mdi-google-drive',
        url: 'https://drive.google.com',
        color: 'green'
    },
]

const openWebsite = (url: string) => {
    window.open(url, '_blank')
}
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="text-h4 mb-6">Dashboard</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title class="text-h6">
                        Quick Access
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col 
                                v-for="link in quickLinks" 
                                :key="link.title"
                                cols="6"
                                sm="4"
                                md="3"
                                lg="2"
                                class="d-flex"
                            >
                                <v-btn
                                    @click="openWebsite(link.url)"
                                    :color="link.color"
                                    class="flex-grow-1"
                                    height="100"
                                    variant="elevated"
                                >
                                    <div class="d-flex flex-column align-center">
                                        <v-icon
                                            :icon="link.icon"
                                            size="32"
                                            class="mb-2"
                                        />
                                        <span class="text-body-2">{{ link.title }}</span>
                                    </div>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Keep existing dashboard content below -->
        <v-row class="mt-6">
            <v-col cols="12">
                <v-card>
                    <v-card-title>Dashboard Content</v-card-title>
                    <v-card-text>
                        <!-- Your existing dashboard content here -->
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.v-btn {
    transition: transform 0.2s;
}

.v-btn:hover {
    transform: translateY(-4px);
}
</style>

