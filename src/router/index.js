import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/* Layout */
import Layout from "@/layout";

import nestedRouter from "./modules/nested";
import errorRouter from "./modules/error";

/**
 * constantRoutes
 * 没有权限要求的基本页面，所有角色都可以访问。
 */
export const constantRoutes = [
  {
    path: "/login",
    hidden: true,
    component: () => import("@/views/login")
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/dashboard"),
        name: "home",
        meta: { title: "首页", icon: "home" }
      }
    ]
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/guide/index"),
        name: "Guide",
        meta: { title: "引导页", icon: "guide" }
      }
    ]
  }
];

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  nestedRouter,
  {
    path: "/icon",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/icons/index"),
        name: "Icons",
        meta: { title: "图标", icon: "icon" }
      }
    ]
  },
  errorRouter,
  {
    path: "/charts",
    component: Layout,
    redirect: "/charts/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/charts/index"),
        name: "Charts",
        meta: { title: "图表", icon: "charts" }
      }
    ]
  }
  // 404 page must be placed at the end !!!
  // { path: "*", redirect: "/404", hidden: true },
];

const router = new VueRouter({
  mode: "hash",
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
});

export default router;
