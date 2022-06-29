import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/register",
      name: "RegistrationView",
      component: () => import("@/views/RegistrationView.vue"),
    },
    {
      path: "/test",
      name: "ForbiddenView",
      component: () => import("@/views/ForbiddenView.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFoundView",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

export default router;
