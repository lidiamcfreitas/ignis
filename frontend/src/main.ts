import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
import router from "./router";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi"; // Icons
import "@mdi/font/css/materialdesignicons.css"; // Material Design Icons

const app = createApp(App)
const pinia = createPinia()

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
app.use(pinia)
app.use(router)

app.mount("#app");