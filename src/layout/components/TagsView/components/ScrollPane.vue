<template>
  <div class="wrapper" @mousewheel="horizontalWheel">
    <slot />
  </div>
</template>
<script>
export default {
  name: "ScrollPane",
  methods: {
    horizontalWheel(event) {
      this.$el.scrollLeft += event.deltaY;
      event.preventDefault();
    }
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
