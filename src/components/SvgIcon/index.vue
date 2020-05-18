<template>
  <svg
    v-if="iconName"
    :class="svgClass"
    aria-hidden="true"
    v-on="$listeners"
    :style="{ height: height, width: width }"
  >
    <use :href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    iconClass: String,
    className: {
      type: String,
      default: ""
    },
    height: String,
    width: String
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    }
  }
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
