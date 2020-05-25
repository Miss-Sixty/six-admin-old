import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/* Layout */
import Layout from "@/layout";

import nestedRouter from "./modules/nested";
import errorRouter from "./modules/error";
import componentsRouter from "./modules/components";
import excel from "./modules/excel";

/**
 * 注意：子菜单仅在路由children.length> = 1时出现
 * redirect: noRedirect           如果设置noRedirect，则不会在面包屑中重定向
 */

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
        component: () => import("@/views/index"),
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
  componentsRouter,
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
  },
  excel,
  nestedRouter,
  errorRouter,
  {
    path: "/error-log",
    component: Layout,
    children: [
      {
        path: "log",
        component: () => import("@/views/error-log/index"),
        name: "ErrorLog",
        meta: { title: "错误日志", icon: "bug" }
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
