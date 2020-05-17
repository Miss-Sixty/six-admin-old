<template>
  <div class="navbar">
    <div class="navbar-icon" @click="toggleSideBar">
      <svg-icon icon-class="hamburger" :class="{ 'is-active': opened }" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    opened: Boolean
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    }
  }
};
</script>

<style scoped lang="scss">
.navbar {
  background-color: aquamarine;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  &-icon {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.03);
    }

    .is-active {
      transform: rotate(180deg);
    }
  }
}
</style>
