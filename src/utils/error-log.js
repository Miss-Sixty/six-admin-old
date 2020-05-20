import Vue from "vue";
import store from "@/store";
import { isArray, isString } from "@/utils/validate";
import settings from "@/settings";

//  you can set in settings.js
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings;
const checkNeed = () => {
  const env = process.env.NODE_ENV;
  if (isString(needErrorLog)) {
    return env === needErrorLog;
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env);
  }
  return false;
};
if (checkNeed()) {
  Vue.config.errorHandler = (err, vm, info) => {
    const url = window.location.href;

    // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    Vue.nextTick(() => {
      store.dispatch("errorLog/addErrorLog", { err, vm, info, url });
    });
  };
}
