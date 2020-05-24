import router from "@/router";
import { Message } from "element-ui";
const state = {
  visitedViews: []
};

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return;
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || "no-name"
      })
    );
  },

  DEL_VISITED_VIEW: (state, view) => {
    const len = state.visitedViews.length;

    for (let i = 0; i < len; i++) {
      if (state.visitedViews[i].path === view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },

  CLOSE_RIGHT_TAG: (state, { view, route }) => {
    const len = state.visitedViews.length;
    let closeIndex; //点击关闭页
    let currentIndex; //当前页

    for (let i = 0; i < len; i++) {
      if (state.visitedViews[i].path === view.path) {
        closeIndex = i;
        if (closeIndex && currentIndex) break;
      }

      if (state.visitedViews[i].path === route.path) {
        currentIndex = i;
        if (closeIndex && currentIndex) break;
      }
    }

    state.visitedViews = state.visitedViews.splice(0, closeIndex + 1);

    if (closeIndex < currentIndex) {
      router.push(state.visitedViews[state.visitedViews.length - 1]);
    }
  },

  CLOSE_OTHER: (state, { view, route }) => {
    state.visitedViews = [view];
    if (view.path !== route.path) router.push(state.visitedViews[0]);
  },

  CLOSE_All: (state, { view, route }) => {
    if (
      state.visitedViews.length === 1 &&
      view.path === route.path &&
      route.path === "/home"
    )
      return;

    if (route.path === "/home") {
      return (state.visitedViews = [view]);
    }

    state.visitedViews = [];
    router.push("/home");
  }
};

const actions = {
  delView({ commit, state }, { view, route }) {
    if (1 === state.visitedViews.length) {
      if (view.path === "/home") {
        return Message({
          message: "不可关闭最后一页",
          type: "warning"
        });
      }

      commit("DEL_VISITED_VIEW", view);
      return router.push("/home");
    }

    if (view.path === route.path) {
      commit("DEL_VISITED_VIEW", view);
      return router.push(
        state.visitedViews[state.visitedViews.length - 1].path
      );
    }

    commit("DEL_VISITED_VIEW", view);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
