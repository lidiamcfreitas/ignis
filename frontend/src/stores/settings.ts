import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
const theme = ref(localStorage.getItem('theme') || 'light')

// Watch for theme changes and update localStorage
watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
})

function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
}

return {
    theme,
    toggleTheme
}
})

