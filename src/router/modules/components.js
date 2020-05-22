/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

export default {
  path: "/components",
  component: Layout,
  redirect: "noRedirect",
  name: "ComponentDemo",
  meta: {
    title: "Components",
    icon: "components"
  },
  children: [
    {
      path: "tinymce",
      component: () => import("@/views/components-demo/tinymce"),
      name: "TinymceDemo",
      meta: { title: "富文本编辑器" }
    },
    {
      path: "markdown",
      component: () => import("@/views/components-demo/markdown"),
      name: "Markdown",
      meta: { title: "Markdown" }
    }
  ]
};
