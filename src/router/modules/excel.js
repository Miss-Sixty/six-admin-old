import Layout from "@/layout";
export default {
  path: "/excel",
  component: Layout,
  name: "Excel",
  meta: {
    title: "Excel",
    icon: "excel"
  },
  children: [
    {
      path: "upload-excel",
      component: () => import("@/views/excel/upload-excel"),
      name: "UploadExcel",
      meta: { title: "上传 Excel" }
    },
    {
      path: "export-excel",
      component: () => import("@/views/excel/export-excel"),
      name: "ExportExcel",
      meta: { title: "导出 Excel" }
    },
    {
      path: "export-selected-excel",
      component: () => import("@/views/excel/select-excel"),
      name: "SelectExcel",
      meta: { title: "导出 选中项" }
    },
    {
      path: "export-merge-header",
      component: () => import("@/views/excel/merge-header"),
      name: "MergeHeader",
      meta: { title: "导出 多级表头" }
    }
  ]
};
