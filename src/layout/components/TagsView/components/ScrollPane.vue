<template>
  <div class="wrapper">
    <slot />
  </div>
</template>
<script>
export default {
  name: "ScrollPane",
  mounted() {
    const wheelEvent =
      "onwheel" in this.$el
        ? "wheel" // Modern browsers support "wheel"
        : document.onmousewheel !== undefined
        ? "mousewheel" // Webkit and IE support at least "mousewheel"
        : "DOMMouseScroll"; //滚动事件的兼容

    this.$el.addEventListener(wheelEvent, event => {
      event.preventDefault();

      this.$el.scrollLeft += -event.wheelDelta || event.deltaY;
    });
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  white-space: nowrap;
  overflow-x: auto;
  padding: 6px 20px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
