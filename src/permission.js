import router from "./router";
// import store from "./store";
// import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import getPageTitle from "@/utils/get-page-title";
import { getToken } from "@/utils/auth"; // get token from cookie

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      // 如果已登录，请重定向到主页
      next({ path: "/" });
      NProgress.done();
    }
  } else {
    if (to.path === "/login") return next();

    next(`/login?redirect=${to.path}`);
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
