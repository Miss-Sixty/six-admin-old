import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";

export default {
  name: "MarkdownViewer",
  props: {
    options: Object,
    data: String,
    height: {
      type: String,
      default: "300px"
    }
  },

  mounted() {
    this.initEditor();
  },
  watch: {
    data(newValue) {
      this.editor.setMarkdown(newValue);
    }
  },
  methods: {
    initEditor() {
      this.editor = new Viewer({
        el: this.$el,
        ...this.options,
        height: this.height,
        initialValue: this.data
      });
    }
  },
  render() {
    return <div />;
  }
};
