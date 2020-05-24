<template>
  <div class="tags-view">
    <scroll-pane class="wrapper">
      <router-link
        class="wrapper__item"
        v-for="item in visitedViews"
        :key="item.path"
        :to="{ path: item.path, query: item.query, fullPath: item.fullPath }"
        tag="span"
        :class="item.path === $route.path ? 'active' : ''"
      >
        {{ item.title }}
        <i class="el-icon-close" @click.prevent.stop="closeSelectedTag(item)" />
      </router-link>
    </scroll-pane>
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
    }
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
        this.$store.dispatch("tagsView/addView", this.$route);
      }
    },

    closeSelectedTag(view) {
      this.$store.dispatch("tagsView/delView", { view, route: this.$route });
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
  overflow: hidden;
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
}
</style>
