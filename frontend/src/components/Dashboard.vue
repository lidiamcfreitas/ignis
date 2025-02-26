<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
<v-container>
    <v-row class="mt-8">
    <v-col cols="12">
        <v-card elevation="2" class="pa-6">
        <h1 class="text-h4 mb-4">Welcome back, {{ user?.display_name || 'User' }}!</h1>
        <p class="text-body-1">This is your personal dashboard. Here you'll find all your important information and quick actions.</p>
        </v-card>
    </v-col>
    </v-row>
</v-container>
</template>

