<template>
  <textarea :id="tinymceId" class="tinymce-textarea" />
</template>

<script>
import plugins from "./plugins";
import toolbar from "./toolbar";
import load from "./dynamicLoadScript";

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN =
  "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";

export default {
  name: "Tinymce",
  props: {
    id: {
      type: String,
      default:
        "tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + "")
    },
    value: {
      type: String,
      default: ""
    },
    toolbar: {
      type: Array,
      default() {
        return [];
      }
    },
    menubar: {
      type: String,
      default: "file edit insert view format table"
    },
    height: {
      type: [Number, String],
      default: 360
    },
    width: {
      type: [Number, String],
      default: "auto"
    }
  },
  data() {
    return {
      tinymceId: this.id
    };
  },
  computed: {
    containerWidth() {
      const width = this.width;
      return /^\d+(\.\d+)?$/.test(width) ? `${width}px` : width;
    }
  },

  mounted() {
    this.init();
  },

  activated() {
    if (window.tinymce) {
      this.initTinymce();
    }
  },

  deactivated() {
    this.destroyTinymce();
  },

  destroyed() {
    this.destroyTinymce();
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN)
        .then(() => {
          this.initTinymce();
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    initTinymce() {
      window.tinymce.init({
        language: "zh_CN",
        selector: `#${this.tinymceId}`,
        height: this.height,
        branding: false, //隐藏右下角技术支持
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar, //工具栏
        menubar: this.menubar, //菜单栏
        plugins: plugins, //工具来引入
        code_dialog_height: 450, //code插件写入框高度
        code_dialog_width: 1000,
        imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"], //可以通过imagetools_cors_hosts选件将一系列受支持的图像域（启用了CORS）提供给TinyMCE 。
        default_link_target: "_blank", //在插入/编辑链接时为链接设置默认目标。
        link_title: false //隐藏对话框中的标题输入。
      });
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId);
      if (tinymce) {
        tinymce.destroy();
      }
    }
  }
};
</script>
