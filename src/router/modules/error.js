import Layout from "@/layout";

export default {
  path: "/error",
  component: Layout,
  name: "ErrorPages",
  meta: {
    title: "错误页面",
    icon: "404"
  },
  redirect: "noRedirect",
  children: [
    {
      path: "/401",
      component: () => import("@/views/error-page/401"),
      name: "Page401",
      meta: { title: "401" }
    },
    {
      path: "/404",
      component: () => import("@/views/error-page/404"),
      name: "Page404",
      meta: { title: "404" }
    }
  ]
};
