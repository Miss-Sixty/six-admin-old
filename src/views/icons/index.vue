<template>
  <div class="app-container">
    <aside>可直接点击复制图标。</aside>
    <ul class="icons-container">
      <li
        v-for="item of svgIcons"
        :key="item"
        @click="handleClipboard(item, $event)"
        class="icons"
      >
        <p class="icons-item">
          <svg-icon :icon-class="item" class-name="disabled" />
          <span>{{ item }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import svgIcons from "./svg-icons";

export default {
  name: "Icons",
  data() {
    return {
      svgIcons
    };
  },
  methods: {
    handleClipboard(symbol, event) {
      let text = `<svg-icon icon-class="${symbol}" />`;
      let clipboard = new Clipboard(event.target, {
        text: () => text
      });

      clipboard.on("success", () => {
        this.$message({
          message: `复制成功：${text}`,
          type: "success"
        });
        clipboard.destroy();
      });

      clipboard.on("error", () => {
        this.$message({
          message: `复制失败：${text}`,
          type: "error"
        });
        clipboard.destroy();
      });

      clipboard.onClick(event);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";
.icons-container {
  overflow: hidden;
  border: 1px solid #eaeefb;
  border-radius: 4px;
  .icons {
    float: left;
    width: 12.5%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: $blue;
    }

    &-item {
      line-height: normal;
      display: inline-block;
      vertical-align: middle;

      .disabled {
        pointer-events: none;
        font-size: 32px;
        margin-bottom: 15px;
      }

      > span {
        display: block;
        font-size: 16px;
      }
    }
  }
}
</style>
