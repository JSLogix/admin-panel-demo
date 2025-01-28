import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/auth",
    component: () => import("@/layouts/auth.vue"),
    meta: {
      auth: false,
    },
    children: [
      {
        path: "sign-in",
        component: () => import("@/views/auth/index.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "error",
        component: () => import("@/views/error.vue"),
        meta: {
          auth: false,
        },
      },
      {
        path: "/admin/dashboard",
        component: () => import("@/views/cabinet/dashboard/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
