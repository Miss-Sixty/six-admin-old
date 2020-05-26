<template>
  <div
    class="upload"
    @click="handleUpload"
    :class="{ 'enter-area': dragover }"
    @drop.prevent="handleDrop"
    @dragover.prevent="dragover = true"
    @dragleave.prevent="dragover = false"
  >
    <i
      class="upload-icon"
      :class="loading ? 'el-icon-loading' : 'el-icon-upload'"
    />
    <p class="upload-text">将 Excel 文件拖拽到此处，或<em>点击上传</em></p>
    <input
      type="file"
      ref="upload-input"
      accept=".xlsx, .xls , .csv"
      style="display:none"
      @change="handleClick"
    />
  </div>
</template>

<script>
import XLSX from "xlsx";

export default {
  props: {
    beforeUpload: {
      //上传前钩子
      type: Function,
      default: () => {}
    },
    onSuccess: {
      //成功上传钩子
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      },
      dragover: false
    };
  },
  methods: {
    generateData({ header, results }) {
      this.excelData.header = header;
      this.excelData.results = results;
      this.onSuccess && this.onSuccess(this.excelData);
    },

    handleDrop(e) {
      if (this.loading) return;
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        return this.$message.error("只支持上传一个文件！");
      }

      const rawFile = files[0];

      if (!this.isExcel(rawFile)) {
        return this.$message.error("仅支持上载.xlsx、.xls、.csv后缀文件！");
      }
      this.upload(rawFile);
    },

    handleUpload() {
      this.$refs["upload-input"].click();
    },

    handleClick(e) {
      const files = e.target.files;
      const rawFile = files[0];
      if (!rawFile) return;
      this.upload(rawFile);
    },

    upload(rawFile) {
      this.$refs["upload-input"].value = null;

      if (!this.beforeUpload) {
        return this.readerData(rawFile);
      }

      const before = this.beforeUpload(rawFile);
      if (before) {
        this.readerData(rawFile);
      }
    },

    readerData(rawFile) {
      this.loading = true;
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const header = this.getHeaderRow(worksheet);
          const results = XLSX.utils.sheet_to_json(worksheet);
          this.generateData({ header, results });
          this.loading = false;
          this.dragover = false;
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },

    getHeaderRow(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet["!ref"]);
      let C;
      const R = range.s.r;
      for (C = range.s.c; C <= range.e.c; ++C) {
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        let hdr = "UNKNOWN " + C;
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";

.upload {
  width: 600px;
  height: 160px;
  margin: 0 auto;
  font-size: 24px;
  color: $gray-7;
  text-align: center;
  border: 2px dashed $gray-5;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;

  &-icon {
    font-size: 67px;
    line-height: 1;
    display: block;
    margin-top: 20px;
  }

  &-text {
    font-size: 14px;
    display: inline-block;
    padding: 0 3px;
    height: 1em;
    > em {
      color: $blue;
      font-style: normal;
    }
  }

  &:hover {
    border-color: $blue;
  }
  &.enter-area {
    border-color: $blue;
    background-color: rgba($color: $blue, $alpha: 0.05);
  }
}
</style>
