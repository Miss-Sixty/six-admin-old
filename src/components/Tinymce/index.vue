<template>
  <textarea
    :id="tinymceId"
    class="tinymce-textarea"
    :style="{ width: containerWidth }"
  />
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
      default: `tiny-vue_${Math.floor(Math.random() * 1000)}${String(
        Date.now()
      )}`
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
    },
    outputFormat: String
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
  watch: {
    value(val, prevVal) {
      if (
        this.editor &&
        typeof val === "string" &&
        val !== prevVal &&
        val !== this.editor.getContent({ format: this.outputFormat })
      ) {
        this.editor.setContent(val);
      }
    }
  },

  mounted() {
    if (this.getTinymce() !== null) {
      this.initialise();
    } else if (this.$el && this.$el.ownerDocument) {
      load(tinymceCDN)
        .then(() => {
          this.initialise();
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    }
  },

  beforeDestroy() {
    this.destroyTinymce();
  },

  methods: {
    getTinymce() {
      const global = typeof window !== "undefined" ? window : global;
      return global && global.tinymce ? global.tinymce : null;
    },

    initialise() {
      this.getTinymce().init({
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
        link_title: false, //隐藏对话框中的标题输入。
        setup: editor => {
          this.editor = editor;
          editor.on("init", e => this.initEditor(e, editor));
        }
      });
    },

    destroyTinymce() {
      if (this.getTinymce() !== null) {
        this.getTinymce().remove(this.editor);
      }
    },

    initEditor(initEvent, editor) {
      editor.setContent(this.value);

      editor.on("change keyup undo redo", () => {
        this.$emit("input", editor.getContent({ format: this.outputFormat }));
      });
    }
  }
};
</script>
