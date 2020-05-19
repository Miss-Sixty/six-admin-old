import Vue from "vue";
import VueRouter from "vue-router";
/* Layout */
import Layout from "@/layout";

Vue.use(VueRouter);

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
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard"),
        name: "Dashboard",
        meta: { title: "首页", icon: "dashboard", affix: true }
      }
    ]
  }
];

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  // {
  //   path: "/error",
  //   component: Layout,
  //   redirect: "noRedirect",
  //   name: "ErrorPages",
  //   meta: {
  //     title: "Error Pages",
  //     icon: "404",
  //   },
  //   children: [
  //     {
  //       path: "401",
  //       component: () => import("@/views/error-page/401"),
  //       name: "Page401",
  //       meta: { title: "401", noCache: true },
  //     },
  //     {
  //       path: "404",
  //       component: () => import("@/views/error-page/404"),
  //       name: "Page404",
  //       meta: { title: "404", noCache: true },
  //     },
  //   ],
  // },
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
