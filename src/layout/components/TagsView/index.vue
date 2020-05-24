<template>
  <div class="tags-view" @contextmenu.prevent>
    <scroll-pane class="wrapper">
      <router-link
        class="wrapper__item"
        v-for="item in visitedViews"
        :key="item.path"
        :to="{ path: item.path, query: item.query, fullPath: item.fullPath }"
        tag="span"
        :class="item.path === $route.path ? 'active' : ''"
        @contextmenu.prevent.native="openMenu(item, $event)"
      >
        {{ item.title }}
        <i class="el-icon-close" @click.prevent.stop="closeSelectedTag(item)" />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      class="tags-view__menu"
      :style="{ left: left + 'px', top: top + 'px' }"
    >
      <li @click="refreshSelectedTag">刷新</li>
      <li @click="closeRightTag(selectedTag)">关闭右侧</li>
      <li @click="closeOther(selectedTag)">关闭其他</li>
      <li @click="closeAll(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>
<script>
import ScrollPane from "./components/ScrollPane";
export default {
  components: {
    ScrollPane
  },
  watch: {
    $route() {
      this.addTags();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: null
    };
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    }
  },
  methods: {
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.commit("tagsView/ADD_VISITED_VIEW", this.$route);
      }
    },

    closeSelectedTag(view) {
      this.$store.dispatch("tagsView/delView", { view, route: this.$route });
    },

    openMenu(item, event) {
      const menuMinWidth = 110;
      let elInfo = this.$el.getBoundingClientRect();
      const maxLeft = elInfo.width - menuMinWidth; // 边界
      const left = event.clientX - elInfo.left + 15; // 15: 窗口相当于鼠标向右移

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = event.clientY - elInfo.top;
      this.visible = true;
      this.selectedTag = item;
    },

    closeMenu() {
      this.visible = false;
    },

    refreshSelectedTag() {
      this.$store.commit("reload/RELOAD");
    },

    closeRightTag(view) {
      this.$store.commit("tagsView/CLOSE_RIGHT_TAG", {
        view,
        route: this.$route
      });
    },

    closeOther(view) {
      this.$store.commit("tagsView/CLOSE_OTHER", {
        view,
        route: this.$route
      });
    },

    closeAll(view) {
      this.$store.commit("tagsView/CLOSE_All", { view, route: this.$route });
    }
  },

  mounted() {
    this.addTags();
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";

.tags-view {
  user-select: none;
  position: relative;
  &::after {
    position: absolute;
    content: " ";
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border-bottom: 1px solid $gray-4;
    transform: scale(0.5);
  }
  .wrapper__item {
    font-size: 12px;
    display: inline-block;
    cursor: pointer;
    margin-right: 5px;
    border: 1px solid $gray-4;
    color: $gray-7;
    background: #fff;
    padding: 0 6px;
    line-height: 26px;
    border-radius: 2px;
    transition-property: color, background-color, border-color;
    transition-duration: 0.3s, 0.3s, 0.3s;

    &:last-of-type {
      margin-right: 0;
    }

    &.active {
      background-color: $blue;
      color: #fff;
      border-color: $blue;
    }

    > i {
      border-radius: 50%;
      padding: 1px;
      &:hover {
        background: $red;
        color: #fff;
        transition-property: background-color, color;
        transition-duration: 0.3s, 0.3s;
      }
    }
  }

  &__menu {
    position: absolute;
    z-index: 3000;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    background-color: #fff;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    > li {
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
