import Layout from "@/layout";
export default {
  path: "/table",
  component: Layout,
  redirect: "/table/complex-table",
  name: "Table",
  meta: {
    title: "Table",
    icon: "table"
  },
  children: [
    {
      path: "complex-table",
      component: () => import("@/views/table/complex-table"),
      name: "ComplexTable",
      meta: { title: "综合表格" }
    },
    {
      path: "inline-edit-table",
      component: () => import("@/views/table/inline-edit-table"),
      name: "InlineEditTable",
      meta: { title: "行内编辑表格" }
    }
  ]
};
