import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
import router from "./router";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useUserStore } from "./stores/userStore";
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

const vuetify = createVuetify({
    theme: {
    defaultTheme: "light",
    themes: {
        light: {
        colors: {
            primary: "#6200ea",
            secondary: "#03dac6",
            background: "#FFFFFF",
            surface: "#FFFFFF",
            "upload-button": "#E8E8E8",
            "on-background": "#000000",
            "on-surface": "#000000",
        },
        },
        dark: {
        colors: {
            primary: "#bb86fc",
            secondary: "#03dac6",
            background: "#121212",
            surface: "#121212",
            "upload-button": "#424242",
            "on-background": "#FFFFFF",
            "on-surface": "#FFFFFF",
        },
        },
    },
    },
    icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
    },
});
  
app.use(vuetify);
app.use(router)

// Add navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const userStore = useUserStore() // Create store instance within the guard
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

// Initialize the app first
app.mount("#app");

// Initialize auth state observer after the app is mounted
const userStore = useUserStore()
userStore.initializeAuthStateObserver()
