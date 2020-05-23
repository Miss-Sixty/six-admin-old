import Editor from "@toast-ui/editor";
import debounce from "lodash/debounce"; //防抖

import "codemirror/lib/codemirror.css"; // Editor's Dependency Style
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import "@toast-ui/editor/dist/i18n/zh-cn.js";

export default {
  name: "MarkdownEditor",
  props: {
    options: Object,
    previewStyle: {
      type: String,
      default: "vertical"
    },
    value: String,
    initialEditType: {
      type: String,
      default: "markdown"
    },

    language: {
      type: String,
      required: false,
      default: "zh-CN" //https://github.com/nhn/tui.editor/blob/master/apps/editor/docs/i18n.md
    },
    height: {
      type: String,
      default: "300px"
    }
  },

  mounted() {
    this.initEditor();
  },
  methods: {
    initEditor() {
      this.editor = new Editor({
        el: this.$el,
        ...this.options,
        language: this.language,
        height: this.height,
        initialEditType: this.initialEditType,
        previewStyle: this.previewStyle,
        initialValue: this.value
      });
      this.editor.on("change", debounce(this.getHtml, 300));
    },

    getHtml() {
      this.$emit("input", this.editor.getHtml());
    }
  },
  render() {
    return <div />;
  }
};
