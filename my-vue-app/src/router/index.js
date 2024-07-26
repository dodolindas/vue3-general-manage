import { createRouter, createWebHashHistory } from "vue-router";
//制定路由规则

const routes = [
  {
    path: "/",
    name: "mian",
    component: () => import("@/views/Main.vue"),
  },
];

const router = createRouter({
  //设置路由模式
  history: createWebHashHistory(),
  routes,
});

export default router;
