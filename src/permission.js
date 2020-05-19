import router from "./router";
import store from "./store";
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
    console.log("hasToken", hasToken, to);
    if (to.path === "/login") {
      // 如果已登录，请重定向到主页
      next({ path: "/" });
      NProgress.done();
    } else {
      // 确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          // 获取角色信息
          // 注意：角色必须是对象数组！例如：['admin']或，['developer'，'editor']
          const { roles } = await store.dispatch("user/getInfo");

          // 根据角色生成可访问的 roles
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles
          );

          // 动态添加可访问的routes
          router.addRoutes(accessRoutes);

          //设置replace：true，因此导航不会留下历史记录
          //hack方法，以确保addRoutes是完整的
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          // await store.dispatch("user/resetToken");
          // Message.error(error || "Has Error");
          // next(`/login?redirect=${to.path}`);
          // NProgress.done();
        }
      }
    }
  } else {
    console.log("login", hasToken);
    if (to.path === "/login") return next();

    next(`/login?redirect=${to.path}`);
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
