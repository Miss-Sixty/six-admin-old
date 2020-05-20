import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "@/styles/index.scss";

import "@/icons"; // icon
import "@/permission"; // permission control
import "@/utils/error-log"; // error log

const { mockXHR } = require("../mock");
mockXHR();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
