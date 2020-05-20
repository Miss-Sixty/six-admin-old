<template>
  <div class="app-container">
    <aside>
      引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本
      Demo 是基于
      <a
        href="https://github.com/kamranahmedse/driver.js"
        target="_blank"
        id="driverjs"
      >
        driver.js
      </a>
    </aside>

    <el-button
      icon="el-icon-question"
      type="primary"
      @click.prevent.stop="guide"
    >
      显示引导
    </el-button>
  </div>
</template>

<script>
import Driver from "driver.js"; // import driver.js

import "driver.js/dist/driver.min.css";
import steps from "./steps";

export default {
  name: "Guide",
  data() {
    return {
      driver: null
    };
  },
  mounted() {
    this.driver = new Driver({
      doneBtnText: "结束",
      closeBtnText: "关闭",
      nextBtnText: "下一条",
      prevBtnText: "上一条"
    });
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps);
      this.driver.start();
    }
  },
  destroyed() {
    this.driver = null;
  }
};
</script>
