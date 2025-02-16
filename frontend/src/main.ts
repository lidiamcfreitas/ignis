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
import { initializeAuthStore } from '@/firebase'

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
          },
        },
        dark: {
          colors: {
            primary: "#bb86fc",
            secondary: "#03dac6",
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

// Then initialize the store after the app is mounted
// This ensures the Pinia store is properly set up
const userStore = useUserStore()
initializeAuthStore(userStore)