import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../components/Login.vue";
import ProfileView from "../views/ProfileView.vue";
import { useUserStore } from "@/stores/userStore";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Login,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
},
{
path: "/profile",
name: "profile",
component: ProfileView,
meta: { requiresAuth: true }
}
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
const userStore = useUserStore();

if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login');
} else {
    next();
}
});

export default router;
