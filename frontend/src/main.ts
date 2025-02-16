import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
import router from "./router";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi"; // Icons
import "@mdi/font/css/materialdesignicons.css"; // Material Design Icons
import { useUserStore } from "./stores/userStore";

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

const userStore = useUserStore();
userStore.initializeFromStorage();

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
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})


app.mount("#app");