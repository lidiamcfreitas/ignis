<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const router = useRouter()

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const navigateTo = (path: string) => {
    router.push(path)
    isOpen.value = false
}
</script>

<template>
    <v-navigation-drawer :model-value="isOpen" @update:model-value="isOpen = $event" temporary>
        <v-list>
            <v-list-item title="Home" prepend-icon="mdi-home" @click="navigateTo('/dashboard')"></v-list-item>
            <v-list-item title="Profile" prepend-icon="mdi-account" @click="navigateTo('/login')"></v-list-item>
            <v-list-item title="Settings" prepend-icon="mdi-cog" @click="navigateTo('/profile')"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
