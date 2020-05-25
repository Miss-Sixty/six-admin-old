import Layout from "@/layout";
export default {
  path: "/excel",
  component: Layout,
  redirect: "/excel/export-excel",
  name: "Excel",
  meta: {
    title: "Excel",
    icon: "excel"
  },
  children: [
    {
      path: "export-excel",
      component: () => import("@/views/excel/export-excel"),
      name: "ExportExcel",
      meta: { title: "导出Excel" }
    },
    {
      path: "upload-excel",
      component: () => import("@/views/excel/upload-excel"),
      name: "UploadExcel",
      meta: { title: "上传Excel" }
    }
  ]
};
